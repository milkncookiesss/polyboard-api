import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { BlockUserById } from "../../DataLayer/Services/blockList/BlockUserById.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";
// -------------------------------------------------------------------------- //
/**
*/
function blockUser() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { userId } = req.body.user;
      const { blockedUserId } = req.body;
      const userExists = await ValidateUserExists(userId);
      const blockedUserExists = await ValidateUserExists(blockedUserId);

      if (!userExists) {
        res.status(404).send({ message: "user does not exist" });
        return next();
      }
      if (!blockedUserExists) {
        res.status(404).send({ message: "blocked user does not exist" });
        return next();
      }
      if (userId === blockedUserId) {
        res.status(405).send({ message: "cannot block yourself" });
        return next();
      }

      await BlockUserById(userId, blockedUserId);
      res.status(200).send({ message: "successfully blocked user" });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "could not block user" });
      next();
      throw new Error(err);
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
    additionalProperties: false
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    console.error(validate.errors.message);
    throw validate.errors;
  }
}


export { blockUser }
