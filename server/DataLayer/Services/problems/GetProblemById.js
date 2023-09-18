import db from '../../models/index.js';

const Problem = db.Problem;
const Send = db.Send;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function GetProblemById(id) {
  try {
    const problem = await Problem.findOne({ where: { id }, raw: true });
    return problem;
  } catch(err) {
    console.log(err);
    throw err;
  }
}





// -------------------------------------------------------------------------- //
/**
*/
async function GetAllSendsByProblemId(problemId) {
  try {
    const sends = await Send.findAll({ where: { problemId }, order: [["createdAt", "DESC"]], raw: true });
    return sends;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export { 
  GetProblemById, 
  GetAllSendsByProblemId 
}
