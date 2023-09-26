'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn(
      {
        tableName: 'reports',
        schema: 'reports'
      },
      'reporter',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn(
      {
        tableName: 'reports',
        schema: 'reports'
      },
      'reporter'
    )
  }
};
