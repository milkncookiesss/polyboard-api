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

// -------------------------------------------------------------------------- //
/**
*/
async function GetProblemInfo(id) {
  return await Problem.findOne( { where: { id } } );
}

export { 
  DeleteProblemsFromUserId,
  GetProblemInfo
};