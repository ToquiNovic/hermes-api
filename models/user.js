// models/user.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      allowNull: false,
      defaultValue: "USER",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    tableName: "users",
    timestamps: true,
  });
};

