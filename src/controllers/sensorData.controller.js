import { models } from "../database.js";

// export const postSensorData = async (req, res) => {
//   try {
//     const { sensorId, type, value } = req.body;

//     // Validar campos obligatorios
//     if (!sensorId || !type || !value) {
//       return res.status(400).json({
//         success: false,
//         message: "El sensorId, type y value son requeridos.",
//       });
//     }

//     // Crear el dato de sensor en la base de datos
//     const sensorData = await models.SensorData.create({
//       sensorId,
//       type,
//       value,
//     });

//     // Respuesta exitosa
//     res.status(201).json({
//       success: true,
//       message: "Datos del sensor guardados exitosamente.",
//       data: sensorData,
//     });
//   } catch (error) {
//     console.error("Error al guardar los datos del sensor:", error);
//     res.status(500).json({
//       success: false,
//       message: "Hubo un error al guardar los datos del sensor.",
//       error: error.message,
//     });
//   }
// };

export const getSensorData = async (req, res) => {
  try {
    const { sensorId } = req.params;

    // Buscar los datos del sensor
    const sensorData = await models.SensorData.findAll({
      where: { sensorId },
      order: [["createdAt", "DESC"]],
    });

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: "Datos del sensor obtenidos exitosamente.",
      data: sensorData,
    });
  } catch (error) {
    console.error("Error al obtener los datos del sensor:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al obtener los datos del sensor.",
      error: error.message,
    });
  }
};

export const postSensorData = async (req, res) => {
  try {
    const { credentials, data } = req.body;

    // Validar campos obligatorios
    if (!credentials || !credentials.publicKey || !credentials.secretKey) {
      return res.status(400).json({
        success: false,
        message: "Las credenciales (publicKey y secretKey) son requeridas.",
      });
    }

    if (!data || !data.sensorId || !data.value) {
      return res.status(400).json({
        success: false,
        message: "Los datos del sensor (sensorId y value) son requeridos.",
      });
    }

    // Verificar las credenciales
    const isValidCredentials = await validateCredentials(
      credentials.publicKey,
      credentials.secretKey
    );

    if (!isValidCredentials) {
      return res.status(401).json({
        success: false,
        message: "Credenciales inválidas.",
      });
    }

    // Crear o actualizar el dato de sensor en la base de datos
    const [sensorData, created] = await models.SensorData.upsert(
      {
        sensorId: data.sensorId,
        value: data.value,
      },
      {
        where: { sensorId: data.sensorId }, 
        returning: true, 
      }
    );

    // Respuesta exitosa
    res.status(200).json({
      success: true,
      message: created
        ? "Datos del sensor creados exitosamente."
        : "Datos del sensor actualizados exitosamente.",
      data: sensorData,
    });
  } catch (error) {
    console.error("Error al actualizar los datos del sensor:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al actualizar los datos del sensor.",
      error: error.message,
    });
  }
};

// Función para validar credenciales
const validateCredentials = async (publicKey, secretKey) => {
  const team = await models.Team.findOne({
    where: { id: publicKey, token: secretKey },
  });

  return !!team;
};
