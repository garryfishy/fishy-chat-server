'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Translation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Translation.belongsTo(models.User)
    }
  };
  Translation.init({
    from: DataTypes.STRING,
    to: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Translation',
  });
  return Translation;
};