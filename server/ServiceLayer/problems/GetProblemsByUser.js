import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as DB from '../../DataLayer/Services/problems/GetProblemsByUser.js';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

function getProblemsByUser() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.query);
      const { userId } = req.query;
      const userExists = await checkUserExists(userId);
      
      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user was not found" });
        return next();
      }

      const allProblems = await DB.getProblemsByUser(userId);
  
      res.status(200).send({problems: allProblems});
      next();
    } catch(err) {
      console.error("Error in GetProblemByUser ", err);
      res.status(500).send({ statusCode: 500, message: "could not find problems"});
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

export { getProblemsByUser };
