// src/models/sensordata.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const SensorData = sequelize.define(
    "SensorData",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sensorId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "sensorData",
      timestamps: true,
    }
  );
  return SensorData;
};