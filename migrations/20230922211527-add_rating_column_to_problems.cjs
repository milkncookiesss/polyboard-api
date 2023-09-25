'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      {
        tableName: 'problems', 
        schema: 'problems'
      },
      'average_rating',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'average_rating'
    );
  }
};
