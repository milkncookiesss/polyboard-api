import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { GetAllSendsByProblemId } from "../../DataLayer/Services/problems/GetProblemById.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function getAllSendsByProblemId() {
  return async (req, res, next) => {
    try {
      console.log('get all sends by problem id ', req.query);
      await validateRequest(req.query);
      const { problemId } = req.query;
      const problemExists = await ValidateProblemExists(problemId);

      if (!problemExists) {
        res.status(404).send({ statusCode: 404, message: "problem not found" });
        return next();
      }

      const sends = await GetAllSendsByProblemId(problemId);
      res.status(200).send( { sends });
      next();
    } catch (err) {
      console.error("Error In GetAllSendsByProblemId ", err);
      res.status(500).send({ statusCode: 500, message: "could not get sends for problem" });
      next();
    }
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function ValidateProblemExists(problemId) {
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

export { getAllSendsByProblemId }
