import db from '../../models/index.js';

const Send = db.Send;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetSendInfo(id) {
  return await Send.findOne({ where: { id }});
}

async function CheckUserOwnsSend(userId, id) {
  try {
    return await Send.count({ where: {id, userId} });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { GetSendInfo, CheckUserOwnsSend };
