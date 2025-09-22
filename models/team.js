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
      },
      inviteCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AdminTeamId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "teams",
      timestamps: true,
    }
  );
  return Team;
};
