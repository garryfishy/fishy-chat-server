'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate:{
          notEmpty: {
            msg:`Username Cannot be Empty!`
          },
          notNull: {
            msg: 'Please enter your name'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate:{
          isEmail:true,
          notEmpty: {
            msg:`Email Cannot be Empty!`,
          },
          notNull: {
            msg: 'Please enter your email'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        validate:{
          notEmpty: {
            msg:`Password Cannot be Empty!`
          },
          notNull: {
            msg: 'Please enter your password'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};