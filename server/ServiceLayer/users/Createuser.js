import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt';
import * as DB from '../../DataLayer/Services/users/CreateUser.js';
import { sign } from '../auth/Auth.js';
// -------------------------------------------------------------------------- //
/**
 * Create User
 * 
*/
function createUser() {
  return async (req, res, next) => {
    const { email, password } = req.body;
    const emailExists = await validateEmailUsed(email);
    console.log(emailExists);
    const hashedPassword = await createPasswordHash(password);

    let newUser = {};
    
    if (emailExists) {
      console.log(emailExists);
      res.status(409).send({ message: "email already exists" });
      return next();
    }
    try {
      const id = uuid();
      const role = 'user';
      const userToken = await sign(id, email, role);
      newUser = await DB.CreateUser(id, email, hashedPassword, userToken);
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
  console.log('validate email service');
  return await DB.ValidateUserEmailExists(email);
}
export { createUser }
