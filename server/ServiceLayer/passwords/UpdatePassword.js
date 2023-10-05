import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { UpdatePassword, DeleteUserPasswordResetCodeRecords, ResetCodeExistsForUser } from '../../DataLayer/Services/users/UpdatePassword.js';
import bcrypt from 'bcrypt';

function updatePassword() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { userEmail, password, code } = req.body;
      const hashedPassword = await createPasswordHash(password);
      const resetCodeExists = await ValidateResetCodeExistsForUser(userEmail, code);

      if (!resetCodeExists) {
        res.status(404).send({ statusCode: 404, message: 'user provided incorrect code' });
        return next();
      }

      await Promise.all(
        [
          await UpdatePassword(userEmail, hashedPassword), 
          await DeleteUserPasswordResetCodeRecords(userEmail)
        ]
      );
      
      res.status(200).send({ statusCode: 200, message: 'password updated' });
      next();
    } catch (err) {
      console.error('Erorr in UpdatePassword ', err);
      res.status(500).send({ statusCode: 500, message: 'could not update password' });
      next();
    }
  }
}

// -------------------------------------------------------------------------- //
/**
 * create hashed password
*/
async function createPasswordHash(password) {
  const salt = await bcrypt.genSalt(10);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function ValidateResetCodeExistsForUser(email, code) {
  const userCodeExists = await ResetCodeExistsForUser(email, code);
  let codeExists = false;
  if (userCodeExists) {
    codeExists = true;
  }
  return codeExists;
}

// -------------------------------------------------------------------------- //
/**
*/
async function validateRequest(request) {
  const ajv = new Ajv();

  const schema = {
    type: "object",
    properties: {
      userEmail: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string",
        minLength: 6
      },
      code: {
        type: "string"
      }
    },
    required: ["userEmail", "password", "code"],
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

export { updatePassword };
