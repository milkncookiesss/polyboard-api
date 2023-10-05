import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as DB from '../../DataLayer/Services/users/DeleteUser.js';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

// -------------------------------------------------------------------------- //
/**
*/
function deleteUser() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body.user);
      const { userId } = req.body.user;
      const userExists = await checkUserExists(userId);

      if (userId === "") {
        res.status(400).send({ statusCode: 400, message: "no id was provided" });
        return next();
      }
      
      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user was not found" });
        return next();
      }
    
      await DB.DeleteUser(userId);
      res.status(200).send(true);
      next();
    } catch(err) {
      console.error('error in DeleteUser Service ', err.message);
      res.status(500).send({ statusCode: 500, message: "could not delete user" });
      next();
    }
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function checkUserExists(userId) {
  const userInfo = await GetUserInfo(userId);
  let userExists = false;
  
  if (userInfo) {
    userExists = true;
  }

  return userExists;
}

// -------------------------------------------------------------------------- //
/**
*/
async function validateRequest(request) {
  const ajv = new Ajv();

  const schema = {
    type: "object",
    properties: {
      userId: {
        type: "string",
        format: "uuid"
      }
    },
    required: ["userId"],
    additionalProperties: true
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    throw validate.errors[0];
  }
}

export { deleteUser }
