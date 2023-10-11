import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function GetAllUsers() {
  try {
    return await User.findAll(
      {
        attributes: {
          exclude: 
            [
              'password',
              'userToken'
            ]
        }
      }
    );
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export { GetAllUsers }
