'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'grade',
      {
        type: Sequelize.STRING,
        defaultValue: 'none'
      }
    );
    return await queryInterface.changeColumn(
      {
        tableName: 'sends',
        schema: 'problems'
      },
      'grade',
      {
        type: Sequelize.STRING,
        defaultValue: 'none'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'grade',
      {
        type: Sequelize.STRING
      }
    );
    return await queryInterface.changeColumn(
      {
        tableName: 'sends',
        schema: 'problems'
      },
      'grade',
      {
        type: Sequelize.STRING
      }
    );
  }
};
