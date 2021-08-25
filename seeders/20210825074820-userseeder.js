'use strict';

const {hashPassword} = require('../helpers/bcrypt')


module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Users',[{
     username: 'admin',
     password: hashPassword('admin'),
     email: 'admin@example.com',
     createdAt: new Date(),
     updatedAt: new Date(),
   }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
