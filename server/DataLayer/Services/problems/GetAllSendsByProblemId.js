import db from '../../models/index.js';

const Send = db.Send;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetAllSendsByProblemId(problemId) {
  try {
    const sends = await Send.findAll({ where: { problemId }, raw: true });
    return sends;
  } catch (err) {
    console.error(err)
    throw new Error(err);
  }
}

export { GetAllSendsByProblemId };
