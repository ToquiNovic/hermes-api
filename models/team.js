// src/models/team.js
import { token } from 'morgan';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Team = sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      inviteCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      AdminTeamId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "teams",
      timestamps: true,
    }
  );
  return Team;
};
