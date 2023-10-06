import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { DeleteProblemsFromUserId } from "../../DataLayer/Services/problems/DeleteProblemsFromUserId.js";
import { GetProblemInfo, CheckUserOwnsProblem } from "../../DataLayer/Services/problems/GetProblemInfo.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function deleteProblemsFromUserById() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { userId } = req.body.user;
      const { problemId } = req.body;

      const userExists = await checkUserExists(userId);
      const problemExists = await checkProblemExists(problemId);
      const checkUserOwnsProblem = await checkProblemOwnedByUser(userId, problemId);
      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user not found" });
        return next();
      }
      if (!problemExists) {
        res.status(404).send({ statusCode: 404, message: "problem not found" });
        return next();
      }
      if (!checkUserOwnsProblem) {
        res.status(401).send({ statusCode: 401, message: "cannot delete problem not created by user" });
        return next();
      }

      await DeleteProblemsFromUserId(userId, problemId);
      res.status(200).send(true);
      next();
    } catch(err) {
      console.error("Error in DeleteProblemsFromUserId ", err);
      res.status(500).send({ statusCode: 500, message: "Could not delete problem."});
      next()
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

async function checkProblemOwnedByUser(userId, problemId) {
  const problem = await CheckUserOwnsProblem(userId, problemId);
  let userOwnsProblem = false;
  
  if (problem) {
    userOwnsProblem = true;
  }

  return userOwnsProblem;
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

export { deleteProblemsFromUserById };
