import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
 * Get user emails
*/
async function checkUserEmailExists(email) {
  return await User.findOne({ attributes: ['id'], where: { email } });
}

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserInfo(id) {
  return await User.findOne({ where: { id }, raw: true });
}

export { 
  checkUserEmailExists,
  GetUserInfo
};
