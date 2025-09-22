import { sequelize, models } from "../database.js";
import { Op } from "sequelize";
import { publishSensorData } from "../mqtt/mqttClient.js";

// Obtener datos de un sensor
export const getSensorData = async (req, res) => {
  try {
    const { sensorId } = req.params;
    const { limit, startDate, endDate } = req.query;

    const where = { sensorId };

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt[Op.gte] = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt[Op.lte] = end;
      }
    }

    const options = {
      where,
      order: [["createdAt", "DESC"]],
    };

    if (limit && !isNaN(parseInt(limit))) {
      options.limit = parseInt(limit);
    }

    const sensorData = await models.SensorData.findAll(options);

    return res.status(200).json({
      success: true,
      message: "Datos del sensor obtenidos exitosamente.",
      data: sensorData,
    });
  } catch (error) {
    console.error("❌ Error al obtener los datos del sensor:", error);
    return res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los datos del sensor.",
      error: error.message,
    });
  }
};

// Registrar dato de un sensor
export const postSensorData = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { credentials, data } = req.body;

    // Validar credenciales
    if (!credentials?.publicKey || !credentials?.secretKey) {
      return res.status(400).json({
        success: false,
        message:
          "Credenciales inválidas (publicKey = teamId, secretKey = sensorId).",
      });
    }

    // Validar valor
    if (typeof data?.value !== "number") {
      return res.status(400).json({
        success: false,
        message: "El campo 'value' debe ser numérico.",
      });
    }

    const teamId = credentials.publicKey;
    const sensorId = credentials.secretKey;

    // Guardar en DB con transacción
    const sensorData = await models.SensorData.create(
      { teamId, sensorId, value: data.value },
      { transaction }
    );

    // Publicar en MQTT
    const payload = {
      sensorId,
      value: data.value,
      timestamp: new Date().toISOString(),
    };
    publishSensorData(teamId, sensorId, payload);

    await transaction.commit();

    return res.status(201).json({
      success: true,
      message: "Dato del sensor registrado y publicado correctamente.",
      data: sensorData,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error al registrar el dato del sensor:", error);

    return res.status(500).json({
      success: false,
      message: "Error al registrar el dato del sensor.",
      error: error.message,
    });
  }
};
