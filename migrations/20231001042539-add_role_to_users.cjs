'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      {
        tableName: 'users', 
        schema: 'users'
      },
      'role',
      {
        type: Sequelize.STRING,
        defaultValue: 'user'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'users'
      },
      'role'
    );
  }
};
