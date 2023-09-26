'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'hidden',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
    await queryInterface.addColumn(
      {
        tableName: 'users',
        schema: 'users'
      },
      'hidden',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
    return await queryInterface.addColumn(
      {
        tableName: 'sends',
        schema: 'problems'
      },
      'hidden',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      'hidden'
    )
    await queryInterface.removeColumn(
      {
        tableName: 'users',
        schema: 'users'
      },
      'hidden'
    )
    return await queryInterface.removeColumn(
      {
        tableName: 'sends',
        schema: 'problems'
      },
      'hidden'
    )
  }
};
