'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable(
      'sends',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        problem_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        rating: {
          type: Sequelize.INTEGER
        },
        grade: {
          type: Sequelize.STRING
        },
        note: {
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
        schema: 'problems'
      }
    );
  },

  down: async  (queryInterface, Sequelize) => {
    return await queryInterface.dropTable({ tableName: 'sends', schema: 'problems'});
  }
};
