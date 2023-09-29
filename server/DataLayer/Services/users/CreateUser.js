import { checkUserEmailExists  } from "./GetUserInfo.js";
import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
 * 
 * 
*/
async function ValidateUserEmailExists(email) {
  return await checkUserEmailExists(email);
}

// -------------------------------------------------------------------------- //
/**
 *
*/
async function CreateUser(id, email, password, userToken) {
  // const id = uuid();
  const username = "PolyboardUser" + generateTempUserName(8);
  return await User.create(
    { 
      id, 
      username, 
      displayname: username, 
      email,
      password,
      userToken
    })
    .then((user) => {
      return user;
    })
    .catch(err => {
      throw err;
    });
}

// -------------------------------------------------------------------------- //
/**
 * default username generator
*/
function generateTempUserName(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export { CreateUser, ValidateUserEmailExists };
