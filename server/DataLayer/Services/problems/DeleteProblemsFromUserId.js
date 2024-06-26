import db from '../../models/index.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteProblemsFromUserId(createdBy, id) {
  return await Problem.destroy({ where: { id, createdBy }});
}

export { 
  DeleteProblemsFromUserId
};
