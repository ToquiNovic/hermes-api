import express from "express";
import morgan from "morgan";
import cors from "cors";
import { BACKEND_PORT } from "./config/index.js";
import routes from "./routes/index.js";
import { sequelize } from "./database.js";
import mqttClient from "./mqtt/mqttClient.js"; // 👈 importación

const port = BACKEND_PORT || 3000;
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// database initialization
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synced.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

initializeDatabase();

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// ejemplo de publicar mensaje por HTTP
app.post("/publish", (req, res) => {
  const { topic, message } = req.body;
  if (!topic || !message) {
    return res.status(400).json({ error: "Topic y message son requeridos" });
  }

  mqttClient.publish(topic, message, (err) => {
    if (err) {
      console.error("Error al publicar:", err);
      return res.status(500).json({ error: "Error al publicar" });
    }
    console.log(`📤 Mensaje publicado en ${topic}: ${message}`);
    res.json({ success: true, topic, message });
  });
});

app.use("/api", routes);

// start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
