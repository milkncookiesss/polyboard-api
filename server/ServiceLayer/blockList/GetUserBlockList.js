import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { GetUserBlockListById } from "../../DataLayer/Services/blockList/GetUserBlockList.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function getUserBlockList() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body.user);
      const { userId } = req.body.user;
      const userExists = await ValidateUserExists(userId);

      if (!userExists) {
        res.status(404).send({ message: "user does not exist" });
        return next();
      }

      const blockList = await GetUserBlockListById(userId);
      res.status(200).send({ blockList });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ statusCode: 500, message: "could not get block list" });
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
      userId: {
        type: "string",
        format: "uuid"
      },
      role: {
        type: "string"
      }
    },
    required: ["userId"],
    additionalProperties: false
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    console.error('AJV error ', validate.errors[0].message);
    throw validate.errors;
  }
}

export { getUserBlockList }
