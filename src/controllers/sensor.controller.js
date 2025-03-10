import { models } from "../database.js";

export const postCreateSensor = async (req, res) => {
  try {
    const { name, teamId, description } = req.body;

    if (!name || !teamId) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    const sensor = await models.Sensor.create({
      name,
      teamId,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Sensor creado exitosamente.",
      data: sensor,
    });
  } catch (error) {
    console.error("Error al crear el sensor:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el sensor.",
      error: error.message,
    });
  }
};

export const getSensorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "El ID del sensor es requerido.",
      });
    }

    const sensor = await models.Sensor.findByPk(id);

    if (!sensor) {
      return res.status(404).json({
        success: false,
        message: "Sensor no encontrado.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sensor encontrado exitosamente.",
      data: sensor,
    });
  } catch (error) {
    console.error("Error al obtener el sensor:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener el sensor.",
      error: error.message,
    });
  }
};

export const getSensorsByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;

    if (!teamId) {
      return res.status(400).json({
        success: false,
        message: "El ID del equipo es requerido.",
      });
    }

    const sensors = await models.Sensor.findAll({
      where: { teamId },
    });

    res.status(200).json({
      success: true,
      message: sensors.length > 0 ? "Sensores encontrados exitosamente." : "No hay sensores en este equipo.",
      data: sensors, 
    });
  } catch (error) {
    console.error("Error al obtener los sensores del equipo:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los sensores del equipo.",
      error: error.message,
    });
  }
};

