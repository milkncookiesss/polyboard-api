'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        display_name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          isEmail: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        user_token: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        schema: 'users'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users', { schema: 'users' });
  }
};
