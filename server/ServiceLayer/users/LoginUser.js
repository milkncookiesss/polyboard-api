import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import bcrypt, { compare } from 'bcrypt';
import * as DB from '../../DataLayer/Services/users/LoginUser.js';
import { validateEmail } from '../../Helpers/emailValidation.js';
import { sign } from '../auth/Auth.js';

// -------------------------------------------------------------------------- //
/**
 * 
*/
function loginUser() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { email, password } = req.body;
      const validEmail = validateEmail(email);
      if (!validEmail) {
        res.status().send();
        return next();
      }
      const userInfo = await DB.GetUserInfo(email);
      if (!userInfo) {
        res.status(404).send({ message: "email does not exist" });
        return next();
      }
      const comparePassword = await bcrypt.compare(
        password, 
        userInfo.password
        )
        .then(res => res)
        .catch(err => { throw err });
      
      if (!comparePassword) {
        res.status(401).send({ statusCode: 401, message: "incorrect password or email" });
        return next();
      }

      const token = await sign(userInfo.id, email, userInfo.role);
      const userInfoRes = await DB.UpdateUserToken(userInfo.id, token);
      res.status(200).send(userInfoRes);
      next();
    } catch (err) {
      console.log("Login User Error ", err);
      res.status(500).send({ statusCode: 500, message: "Could not log in User" });
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
      email: {
        type: "string",
        format: "email"
      },
      password: {
        type: "string"
      }
    },
    required: ["email", "password"],
    additionalProperties: false
  };

  addFormats(ajv);
  const validate = ajv.compile(schema);
  const valid = validate(request);

  if (!valid) {
    throw validate.errors[0];
  }
}

export { loginUser }
