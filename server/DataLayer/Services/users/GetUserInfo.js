import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
 * Get user emails
*/
async function checkUserEmailExists(email) {
  try {
    const user = await User.findOne({ attributes: ['id'], where: { email } });
    return user;
  } catch (err) {
    console.error(err);
    throw new Error
  }
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
