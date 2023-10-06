import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as DB from '../../DataLayer/Services/problems/GetProblems.js';

// -------------------------------------------------------------------------- //
/**
*/
function getAllProblems() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body.user);
      const allProblems = await DB.getAllProblems();
  
      res.status(200).send({problems: allProblems});
      next();
    } catch(err) {
      console.error('Error in GetProblems ', err);
      res.status(500).send({statusCode: 500, message: "could not find problems"});
    }
  }
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
    required: ["userId", "role"],
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


export { getAllProblems };
