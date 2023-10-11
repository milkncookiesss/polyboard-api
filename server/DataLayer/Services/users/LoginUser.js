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
      },
      raw: true
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
  .then(userInfo => {
    const user = userInfo[1][0]
    delete user.password;

    return user;
  })
  .catch((err) => {
    console.error(err);
    throw new Error(err);
  });
}

export { GetUserInfo, UpdateUserToken };
