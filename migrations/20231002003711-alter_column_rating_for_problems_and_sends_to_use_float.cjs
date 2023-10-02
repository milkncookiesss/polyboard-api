'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'average_rating',
      {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }
    );
    return await queryInterface.changeColumn(
      {
        tableName: 'sends',
        schema: 'problems'
      },
      'rating',
      {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
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
    return await queryInterface.changeColumn(
      {
        tableName: 'sends',
        schema: 'problems'
      },
      'rating',
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
  }
};
