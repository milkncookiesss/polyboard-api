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

export { GetUserInfo };
