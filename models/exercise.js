"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.exercise.belongsTo(models.user);
      models.exercise.belongsToMany(models.subject, {
        through: "subjectsKatas",
      });
    }
  }
  exercise.init(
    {
      name: DataTypes.STRING,
      cw: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "exercise",
    }
  );
  return exercise;
};
