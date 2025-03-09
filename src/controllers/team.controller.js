import { models } from "../database.js";
import { generateInviteCode } from "../utils/generateCode.js";

export const postCreateTeam = async (req, res) => {
  try {
    const { name, urlImage, AdminTeamId } = req.body;

    if (!name || !urlImage || !AdminTeamId) {
      return res.status(400).json({ 
        success: false,
        message: "Todos los campos son obligatorios." 
      });
    }

    const inviteCode = generateInviteCode();

    const team = await models.Team.create({
      name,
      inviteCode,
      urlImage,
      AdminTeamId,
    });

    res.status(201).json({
      success: true,
      message: "Equipo creado exitosamente.",
      data: team,
    });
  } catch (error) {
    console.error("Error al crear el equipo:", error);
    res.status(500).json({ 
      success: false,
      message: "Hubo un error al crear el equipo.",
      error: error.message, 
    });
  }
};

export const getTeamById = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ 
          success: false,
          message: "El ID del equipo es requerido." 
        });
      }
  
      const team = await models.Team.findByPk(id);
  
      if (!team) {
        return res.status(404).json({ 
          success: false,
          message: "Equipo no encontrado." 
        });
      }

      res.status(200).json({
        success: true,
        message: "Equipo encontrado exitosamente.",
        data: team,
      });
    } catch (error) {
      console.error("Error al obtener el equipo:", error);
      res.status(500).json({ 
        success: false,
        message: "Hubo un error al obtener el equipo.",
        error: error.message,
      });
    }
  };