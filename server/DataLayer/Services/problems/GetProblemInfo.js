import db from '../../models/index.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function GetProblemInfo(id) {
  return await Problem.findOne( { where: { id } } );
}

async function CheckUserOwnsProblem(createdBy, id) {
  try {
    return await Problem.count( { where: { id, createdBy }});
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}


export { GetProblemInfo, CheckUserOwnsProblem };
