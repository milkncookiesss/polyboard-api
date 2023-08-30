'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: "users",
        schema: "users"
      },
      [
        {
          id: 1,
          user_name: "admin",
          display_name: "admin",
          email: "test@test.com",
          password: "aaaaaa",
          user_token: "thisisavalidtoken",
          created_at: new Date(),
          updated_at: new Date()
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: "users",
        schema: "users"
      },
      {
        where: {
          id: 1
        }
      }
    )
  }
};
