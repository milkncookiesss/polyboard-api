'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('reports');
    return await queryInterface.createTable(
      'reports',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        report_type: {
          type: Sequelize.STRING
        },
        comment: {
          type: Sequelize.STRING
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      },
      {
        schema: 'reports'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: 'reports', schema: 'reports'});
    return await queryInterface.dropSchema('reports');
  }
};
