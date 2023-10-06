import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { UnBlockUserById } from "../../DataLayer/Services/blockList/UnBlockUserById.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";


function unBlockUser() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { userId } = req.body.user;
      const { blockedUserId } = req.body;
      const userExists = await ValidateUserExists(userId);
      const blockedUserExists = await ValidateUserExists(blockedUserId);

      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user does not exist" });
        return next();
      }
      if (!blockedUserExists) {
        res.status(404).send({ statusCode: 404, message: "blocked user does not exist" });
        return next();
      }

      await UnBlockUserById(userId, blockedUserId);
      res.status(200).send({ statusCode: 200, message: "unblocked user" });
      next();
    } catch (err) {
      console.error('Error In UnBlockUserById ', err);
      res.status(500).send({ statusCode: 500, message: "could not unblock user" });
      next();
    }

  }
}


// -------------------------------------------------------------------------- //
/**
*/
async function ValidateUserExists(userId) {
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
      blockedUserId: {
        type: "string",
        format: "uuid"
      }
    },
    required: ["blockedUserId"],
    additionalProperties: true
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    throw validate.errors[0];
  }
}

export { unBlockUser }
