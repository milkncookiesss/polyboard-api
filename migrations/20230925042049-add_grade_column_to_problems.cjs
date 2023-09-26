'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async  (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      {
        tableName: 'problems', 
        schema: 'problems'
      },
      'grade',
      {
        type: Sequelize.STRING
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'grade'
    );
  }
};
