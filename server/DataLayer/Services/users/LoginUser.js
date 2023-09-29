import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserInfo(email) {
  console.log("in login data");
  return await User.findOne(
    { 
      where: { 
        email
      }
    }
  )
  .then(user => user)
  .catch((err) => {
    throw err;
  });
}

// -------------------------------------------------------------------------- //
/**
*/
async function UpdateUserToken(id, userToken) {
  return await User.update(
    { 
      userToken 
    }, 
    { 
      where: {
        id 
      },
      returning: true,
      raw: true
    }
  )
  .then(userInfo => userInfo[1][0])
  .catch((err) => {
    console.error(err);
    throw new Error(err);
  });
}

export { GetUserInfo, UpdateUserToken };
