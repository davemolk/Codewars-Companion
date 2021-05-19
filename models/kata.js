"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.kata.belongsTo(models.user);
      models.kata.belongsToMany(models.subject, { through: "subjectsKatas" });
    }
  }
  kata.init(
    {
      name: DataTypes.STRING,
      cw: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kata",
    }
  );
  return kata;
};
