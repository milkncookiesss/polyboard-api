import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';
import * as DB from '../../DataLayer/Services/users/CreateUser.js';
// -------------------------------------------------------------------------- //
/**
 * Create User
 * 
*/
function createUser() {
  return async (req, res, next) => {
    const { email, password } = req.body;
    const emailExists = await validateEmailUsed(email);
    const hashedPassword = await createPasswordHash(password);
    console.log("=================================");
    console.log(email);
    console.log(hashedPassword);
    console.log("=================================");
    let newUser = {};
    
    if (emailExists) {
      console.log(emailExists);
      res.status(409).send({ message: "email already exists" });
      return next();
    }
    try {
      newUser = await DB.CreateUser(email, hashedPassword);
    } catch(err) {
      res.status(500).send(err);
      return next();
    }
    res.status(200).send(newUser);
    next();
  }
}

// -------------------------------------------------------------------------- //
/**
 * create hashed password
*/
async function createPasswordHash(password) {
  const salt = await bcrypt.genSalt(10);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch(err) {
    console.error(err);
    throw err;
  }


}

async function validateEmailUsed(email) {
  return await DB.ValidateUserEmailExists(email);
}
export { createUser }
