// src/models/sensor.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Sensor = sequelize.define(
    "Sensor",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },    
      teamId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "sensors",
      timestamps: true,
    }
  );
  return Sensor;
};
