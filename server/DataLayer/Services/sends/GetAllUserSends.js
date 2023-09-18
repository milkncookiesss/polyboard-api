import db from '../../models/index.js';

const Send = db.Send;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetAllUserSends(userId) {
  try {
    const sends = await Send.findAll({ where: { userId }, order: [["createdAt", "DESC"]], raw: true });
    return sends;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export { GetAllUserSends };
