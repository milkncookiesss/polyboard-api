import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as DB from "../../DataLayer/Services/problems/GetProblemById.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";
// -------------------------------------------------------------------------- //
/**
*/
function getProblemById() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.query);
      const { problemId } = req.query;
      const problemExists = await checkProblemExists(problemId);
      if (!problemExists) {
        res.status(404).send({ statusCode: 404, message: "problem not found" });
        return next();
      }

      const problem = await DB.GetProblemById(problemId);
      const sends = await DB.GetAllSendsByProblemId(problemId);
      problem.sends = sends;

      res.status(200).send({ problem });
      next();
    } catch(err) {
      console.error("Error In GetProblemById ", err);
      res.status(500).send({ statusCode: 500, message: "could not retrieve problem." })
      next();
    }
  }
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
      }
    },
    required: ["problemId"],
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

export { getProblemById };
