'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Translation)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:`Username Cannot be Empty!`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail:true,
        notEmpty: {
          msg:`Email Cannot be Empty!`,
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg:`Password Cannot be Empty!`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};