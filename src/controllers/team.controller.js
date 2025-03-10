import { models } from "../database.js";
import { generateInviteCode } from "../utils/generateCode.js";
import { generateToken } from "../utils/token.js";
import { AUX_URL } from "../config/index.js";

export const postCreateTeam = async (req, res) => {
  try {
    const { id, name, extensionFile, AdminTeamId } = req.body;

    if (!id || !name || !AdminTeamId) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son obligatorios.",
      });
    }

    // Verificar si ya existe un equipo con ese nombre
    const existingTeam = await models.Team.findOne({ where: { name } });
    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Ya existe un equipo con ese nombre.",
      });
    }

    const urlLogo = `${AUX_URL}/teams/${id}.${extensionFile}`;
    const inviteCode = generateInviteCode();
    const token = generateToken();

    const team = await models.Team.create({
      name,
      inviteCode,
      urlImage: urlLogo,
      AdminTeamId,
      token,
    });

    await models.User.update({ teamId: team.id }, { where: { id: AdminTeamId } });

    res.status(201).json({
      success: true,
      message: "Equipo creado exitosamente.",
      data: {
        ...team.toJSON(),
        token,
      },
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
        message: "El ID del equipo es requerido.",
      });
    }

    const team = await models.Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Equipo no encontrado.",
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

export const getTeamMembers = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("id", id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "El ID del equipo es requerido.",
      });
    }

    const team = await models.Team.findByPk(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Equipo no encontrado.",
      });
    }

    const teamMembers = await models.User.findAll({
      where: { TeamId: id },
      attributes: ["id", "imageUrl"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      message: "Equipo encontrado exitosamente.",
      data: teamMembers,
    });
  } catch (error) {
    console.error("Error al obtener los miembros del equipo:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los miembros del equipo.",
      error: error.message,
    });
  }
};

export const postJoinTeam = async (req, res) => {
  try {
    const { inviteCode, userId } = req.body;

    console.log("userId", userId);
    console.log("inviteCode", inviteCode);

    // Validar campos obligatorios
    if (!inviteCode || !userId) {
      return res.status(400).json({
        success: false,
        message: "El inviteCode y el userId son requeridos.",
      });
    }

    // Buscar el equipo por inviteCode
    const team = await models.Team.findOne({
      where: { inviteCode },
    });

    if (!team) {
      console.error("Equipo no encontrado para inviteCode:", inviteCode);
      return res.status(404).json({
        success: false,
        message: "Equipo no encontrado.",
      });
    }

    console.log("team", team.id);

    // Buscar el usuario por userId
    const user = await models.User.findByPk(userId);

    if (!user) {
      console.error("Usuario no encontrado para userId:", userId);
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }

    // Actualizar el TeamId del usuario
    const [updatedRows] = await models.User.update(
      { teamId: team.id },
      { where: { id: userId } }
    );

    if (updatedRows === 0) {
      console.error("No se pudo actualizar el usuario con userId:", userId);
      return res.status(404).json({
        success: false,
        message: "No se pudo actualizar el usuario.",
      });
    }

    // Obtener el usuario actualizado
    const updatedUser = await models.User.findByPk(userId);

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: "Usuario unido al equipo exitosamente.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error al unirse al equipo:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al unirse al equipo.",
      error: error.message,
    });
  }
};