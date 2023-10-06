import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { CreateSend } from "../../DataLayer/Services/sends/CreateSend.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function createSend() {
  return async (req, res, next) => {
    try {
      console.log('inside create send ', req.body);
      await validateRequest(req.body);
      const { userId } = req.body.user;
      const { problemId, note, rating, grade } = req.body;
      const userExists = await checkUserExists(userId);
      const problemExists = await checkProblemExists(problemId);

      if (!userExists) {
        res.status(404).send({ statusCode:404, message: "user not found" });
        return next();
      }
      if (!problemExists) {
        res.status(404).send({ statusCode: 404, message: "problem not found" });
        return next();
      }

      const send = await CreateSend(userId, problemId, note, rating, grade);
      res.status(200).send({ send });
      next();
    } catch(err) {
      console.error("Error in CreateSend ", err);
      res.status(500).send({ statusCode: 500, message: "Could not create send." });
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
async function checkProblemExists(problemId) {
  const problemInfo = await GetProblemInfo(problemId);
  let problemExists = false;
  
  if (problemInfo) {
    problemExists = true;
  }

  return problemExists;
}

// -------------------------------------------------------------------------- //
/**
*/
async function validateRequest(request) {
  const ajv = new Ajv();

  const schema = {
    type: "object",
    properties: {
      problemId: {
        type: "string",
        format: "uuid"
      },
      note: {
        type: "string"
      },
      rating: {
        type: "number"
      },
      grade: {
        type: "string"
      },
      user: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            format: "uuid"
          },
          role: {
            type: "string"
          }
        }
      }
    },
    required: ["problemId", "user"],
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

export { createSend }
