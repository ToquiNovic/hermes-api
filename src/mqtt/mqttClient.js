import { models } from "../database.js";
import mqtt from "mqtt";
import { MQTT_URL } from "../config/index.js";

const mqttClient = mqtt.connect(MQTT_URL);
const subscribedTopics = new Set();

// Conexión
mqttClient.on("connect", () => {
  console.log("✅ Conectado al broker MQTT");

  // Suscribirse a todos los sensores con comodines
  const wildcardTopic = "hermes-mqtt/team/+/sensor/+";
  mqttClient.subscribe(wildcardTopic, (err) => {
    if (err) console.error("❌ Error al suscribirse:", err);
    else {
      console.log(`📡 Suscrito a ${wildcardTopic}`);
      subscribedTopics.add(wildcardTopic);
    }
  });
});

mqttClient.on("error", (err) => {
  console.error("❌ Error MQTT:", err);
});

// Construir topic dinámico
export function buildTopic(teamId, sensorId) {
  return `hermes-mqtt/team/${teamId}/sensor/${sensorId}`;
}

// Publicar mensaje
export function publishSensorData(teamId, sensorId, data) {
  const topic = buildTopic(teamId, sensorId);
  const message = JSON.stringify(data);

  mqttClient.publish(topic, message, (err) => {
    if (err) console.error("❌ Error al publicar:", err);
    else console.log(`📤 Publicado en ${topic}: ${message}`);
  });
}

// Manejador global de mensajes MQTT
mqttClient.on("message", async (topic, message) => {
  try {
    console.log(`📩 Mensaje en ${topic}: ${message.toString()}`);
    const payload = JSON.parse(message.toString());
    const topicParts = topic.split("/");
    const teamId = topicParts[2];
    const sensorId = topicParts[4];
    const { value, timestamp } = payload;

    if (value === undefined) {
      console.warn("⚠️ Payload recibido sin 'value':", payload);
      return;
    }

    await models.SensorData.create({
      teamId,
      sensorId,
      value,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    console.log(
      `💾 Guardado en DB -> teamId=${teamId}, sensorId=${sensorId}, value=${value}, timestamp=${
        timestamp || new Date()
      }`
    );
  } catch (err) {
    console.error("❌ Error procesando mensaje MQTT:", err.message);
  }
});

// Desuscribirse
export function unsubscribeFromWildcard() {
  const wildcardTopic = "hermes-mqtt/team/+/sensor/+";
  if (subscribedTopics.has(wildcardTopic)) {
    mqttClient.unsubscribe(wildcardTopic, (err) => {
      if (err) console.error("❌ Error al desuscribirse:", err);
      else {
        console.log(`📴 Desuscrito de ${wildcardTopic}`);
        subscribedTopics.delete(wildcardTopic);
      }
    });
  }
}

export default mqttClient;
