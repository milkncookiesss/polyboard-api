'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      {
        tableName: 'users', 
        schema: 'users'
      },
      'verified_user',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'users'
      },
      'verified_user'
    );
  }
};
