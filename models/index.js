// models/index.js
import Sensor from './sensor.js';
import SensorData from './sensordata.js';
import Team from './team.js';
import User from './user.js';

export default (sequelize) => {
  const models = {
    Sensor: Sensor(sequelize),
    SensorData: SensorData(sequelize),
    Team: Team(sequelize),
    User: User(sequelize),
  };

  // Un Team tiene muchos Users
  models.Team.hasMany(models.User, { foreignKey: "teamId" });
  models.User.belongsTo(models.Team, { foreignKey: "teamId" });

  // Un Team tiene muchos Sensors
  models.Team.hasMany(models.Sensor, { foreignKey: "teamId" });
  models.Sensor.belongsTo(models.Team, { foreignKey: "teamId" });

  // Un Sensor tiene muchos SensorData
  models.Sensor.hasMany(models.SensorData, { foreignKey: "sensorId" });
  models.SensorData.belongsTo(models.Sensor, { foreignKey: "sensorId" });  

  return models;
};
