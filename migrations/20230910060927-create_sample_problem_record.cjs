'use strict';
const { uuid } = require('uuidv4');
const now = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      [
        {
          id: uuid(),
          name: 'admin route bb',
          created_by: '9985174d-117a-4185-9077-70ac123dc050',
          route: [
            'c-J_a3_a',
            'c-Box_a11_a',
            'c-Q_a8_a',
            'c-M_a3_a',
            'c-Delta_a12_a',
            'c-P_a5_a',
            'c-E_a6_a'
            ],
          weight: '15lb',
          creator_note: 'the best route you will ever see',
          created_at: now,
          updated_at: now
        }
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      {
        tableName: 'problems',
        schema: 'problems'
      },
      {
        name: 'admin route bb'
      }
    )
  }
};
