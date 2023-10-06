import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';

// -------------------------------------------------------------------------- //
/**
 * create problem service layer
*/
function createProblem() {
  return async (req, res, next) => {
    try{
      console.log('inside create problem ', req.body);
      await validateRequest(req.body);
      const { name="", route, creatorNote="", weight="" } = req.body;
      const { userId } = req.body.user;
      const problem = await DB.createProblem(userId, route, weight, name, creatorNote);
      res.status(200).send({ problem: problem });
      next();
    } catch (err) {
      console.error("Error in CreateProblem ", err);
      res.status(500).send({ statusCode: 500, message: "Could not create problem." });
      next();
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
      name: {
        type: "string"
      },
      route: {
        type: "array"
      },
      creatorNote: {
        type: "string"
      },
      weight: {
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
    required: ["name", "route", "weight", "user"],
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

export { createProblem };
