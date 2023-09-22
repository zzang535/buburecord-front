"use strict";
module.exports = (sequelize, DataTypes) => {
  const health = sequelize.define(
    "health",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "health",
    }
  );
  health.associate = function (models) {
    health.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };
  return health;
};
