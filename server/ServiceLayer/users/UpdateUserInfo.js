import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { UpdateUserInfo, CheckUserNameExists } from "../../DataLayer/Services/users/UpdateUserInfo.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

function updateUserInfo() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { username="", displayname="" } = req.body;
      const { userId } = req.body.user;
      const userExists = await CheckUserExists(userId);
      const userNameExists = await UserNameValidator(username);

      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user does not exist" });
        return next();
      }
      if (userNameExists) {
        res.status(409).send({ statusCode: 409, message: 'username already exists' });
        return next();
      }

      const updatePayload = {};
      for (const field in req.body) {
        if (req.body[field] !== "") {
          updatePayload[field] = req.body[field];
        }
      }
      delete updatePayload.user;
      
      const user = await UpdateUserInfo(userId, updatePayload);
      res.status(200).send({ user });
    } catch (err) {
      console.error(err);
      res.status(500).send({ statusCode: 500, message: 'could not update user' });
      throw err;
    }
    next();
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function UserNameValidator(username) {
  const userNameExists = await CheckUserNameExists(username);
  let exists = false;

  if (userNameExists) {
    exists = true;
  }

  return exists;
}

// -------------------------------------------------------------------------- //
/**
*/
async function CheckUserExists(userId) {
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
      username: {
        type: "string"
      },
      displayname: {
        type: "string"
      }
    },
    anyOf: [
      {
        required: ["username"]
      },
      {
        required: ["displayname"]
      }
    ],
    additionalProperties: true
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    throw validate.errors[0];
  }
}

export { updateUserInfo }
