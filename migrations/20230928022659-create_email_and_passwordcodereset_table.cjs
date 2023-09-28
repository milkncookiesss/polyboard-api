'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      {
        tableName: 'passwordresetcode',
        schema: 'users'
      },
      {
        email: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable({ tableName: 'passwordresetcode', schema: 'users' })
  }
};
