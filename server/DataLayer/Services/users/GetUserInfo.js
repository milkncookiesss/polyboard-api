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
    throw new Error(err);
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserInfo(id) {
  try {
    return await User.findOne(
      {
        where: {
          id 
        },
        attributes: {
          exclude: 
          [
            'password',
            'userToken'
          ]
        }
      }
    );
  } catch(err) {
    console.error(err);
    throw new Error(err);
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserInfoByEmail(email) {
  try {
    return await User.findOne({ where: { email }});
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserAndTokenInfo(id, token) {
  try {
    return await User.findOne({ where: { id, userToken: token }});
  } catch (err) {
    console.error('Error In GetUserAndTokenInfo ', err);
    throw new Error(err);
  }
}

export { 
  checkUserEmailExists,
  GetUserInfo,
  GetUserInfoByEmail,
  GetUserAndTokenInfo
};
