import db from '../../models/index.js';

const Send = db.Send;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetSendInfo(id) {
  return await Send.findOne({ where: { id }});
}

export { GetSendInfo };
