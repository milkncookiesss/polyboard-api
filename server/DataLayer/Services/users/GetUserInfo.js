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
  try {
    return await User.findOne({ where: { id }});
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function GetUserInfoByEmail(email) {
  try {
    return await User.findOne({ where: { email }});
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { 
  checkUserEmailExists,
  GetUserInfo,
  GetUserInfoByEmail
};
