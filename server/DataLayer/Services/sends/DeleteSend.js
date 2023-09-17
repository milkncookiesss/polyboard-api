import db from '../../models/index.js';

const Send = db.Send;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteSend(id) {
  return await Send.destroy({ where: { id, userId, problemId }});
}

export { DeleteSend };
