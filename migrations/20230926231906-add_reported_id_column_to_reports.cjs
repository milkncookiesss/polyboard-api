'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      {
        tableName: 'reports',
        schema: 'reports'
      },
      'reported_id',
      {
        type: Sequelize.UUID,
        allowNull: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      {
        tableName: 'reports',
        schema: 'reports'
      },
      'reported_id'
    )
  }
};
