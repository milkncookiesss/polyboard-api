import Ajv from 'ajv';
import addFormats from 'ajv-formats';
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
    try {
      await validateRequest(req.body);
      const { email, password } = req.body;
      const emailExists = await validateEmailUsed(email);
      const hashedPassword = await createPasswordHash(password);

      let newUser = {};
      
      if (emailExists) {
        res.status(409).send({ statusCode: 409, message: "email already exists" });
        return next();
      }
      const id = uuid();
      const role = 'user';
      const userToken = await sign(id, email, role);
      newUser = await DB.CreateUser(id, email, hashedPassword, userToken);
      res.status(200).send(newUser);
      next();
    } catch(err) {
      console.error("Create User Sever Error ", err.message);
      res.status(500).send({ statusCode: 500, message: "could not create user" });
      next();
    }
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

// -------------------------------------------------------------------------- //
/**
*/
async function validateEmailUsed(email) {
  return await DB.ValidateUserEmailExists(email);
}

// -------------------------------------------------------------------------- //
/**
*/
async function validateRequest(request) {
  const ajv = new Ajv();

  const schema = {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string"
      }
    },
    required: ["email", "password"],
    additionalProperties: false
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    console.error('AJV error ', validate.errors[0].message);
    throw validate.errors[0];
  }
}

export { createUser }
