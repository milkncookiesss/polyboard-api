'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      {
        tableName: 'blocklist',
        schema: 'users'
      },
      {
        user_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        blocked_user_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
        },
        updated_at: {
          type: Sequelize.DATE
        }
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable({ tableName: 'blocklist', schema: 'users' });
  }
};
