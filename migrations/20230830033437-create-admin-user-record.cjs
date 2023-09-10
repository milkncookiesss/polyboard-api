'use strict';
const { uuid } = require('uuidv4');
const now = new Date();
console.log(uuid());
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'users',
        schema: 'users'
      },
      [
        {
          id: uuid(),
          username: "admin",
          displayname: "admin",
          email: "test@test.com",
          password: "aaaaaa",
          user_token: "thisisavalidtoken",
          created_at: now,
          updated_at: now
        }
      ]
    )
    // return queryInterface.sequelize.query(
    //   `
    //   INSERT INTO users.users (id, user_name, display_name, email, password, user_token)
    //   VALUES('${uuid()}', 'admin', 'admin', 'admin@polyboard.com', 'validpassword', 'validtoken');
    // `
    // )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'users',
        schema: 'users'
      },
      {
        user_name: 'admin'
      }
    )
  }
};
