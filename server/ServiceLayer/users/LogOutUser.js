import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';
import { UpdateUserTokenAtLogOut } from '../../DataLayer/Services/users/LogOutUser.js';

// -------------------------------------------------------------------------- //
/**
*/
function logOutUser() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body.user);
      const { userId } = req.body.user;
      const userExists = await checkUserExists(userId);

      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user was not found" });
        return next();
      }

      await UpdateUserTokenAtLogOut(userId);
      res.status(200).send(true);
      next();
    } catch (err) {
      console.error('Error in LogOutUser ', err);
      res.status(500).send({ statusCode: 500, message: err.message });
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
      },
      role: {
        type: "string"
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

export { logOutUser };
