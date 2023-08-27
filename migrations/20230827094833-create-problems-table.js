'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'problems',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_by: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'users',
              schema: 'users'
            },
            key: 'id'
          },
          allowNull: false
        },
        route_path: {
          type: Sequelize.STRING,
          allowNull: false
        },
        weight: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      },
      {
        schema: 'problems'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('problems', { schema: 'problems' });
  }
};
