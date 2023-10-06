import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { GetAllUserSends } from "../../DataLayer/Services/sends/GetAllUserSends.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function getAllUserSends() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.query);
      const { userId } = req.query

      if (userId === "") {
        res.status(400).send({ message: "no id was provided" });
        return next();
      }
      const userExists = await checkUserExists(userId);
      
      if (!userExists) {
        res.status(404).send({ message: "user was not found" });
        return next();
      }

      const sends = await GetAllUserSends(userId);
      res.status(200).send({ sends });
      next();
    } catch(err) {
      console.log(err);
      res.status(500).send({ message: "unable to get sends" });
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
    console.error('AJV error ', validate.errors[0].message);
    throw validate.errors[0];
  }
}

export { getAllUserSends };
