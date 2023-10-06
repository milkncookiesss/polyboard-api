import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

// -------------------------------------------------------------------------- //
/**
*/
function getUserById() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.query, res, next);
      const { userId } = req.query;
      if (!userId) {
        res.status(400).send({ statusCode: 400, message: "Bad Request" });
        return next();
      }
      let user = null;
      user = await GetUserInfo(userId);
      if (!user) {
        res.status(404).send({ statusCode: 404, message: "user not found" });
        return next();
      }
      res.status(200).send({ user });
      next();
    } catch(err) {
      res.status(500).send({ statusCode: 500, message: err[0].message })
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
    console.error(validate.errors.message);
    throw validate.errors;
  }
}

export { getUserById };
