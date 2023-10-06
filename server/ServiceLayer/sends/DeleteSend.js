import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { DeleteSend } from "../../DataLayer/Services/sends/DeleteSend.js";
import { GetSendInfo, CheckUserOwnsSend } from "../../DataLayer/Services/sends/GetSendInfo.js"
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function deleteSend() {
  return async (req, res, next) => {
    try {
      await validateRequest(req.body);
      const { userId } = req.body.user;
      const { problemId, sendId } = req.body;
      const sendExists = await checkSendExists(sendId);
      const userExists = await checkUserExists(userId);
      const problemExists = await checkProblemExists(problemId);
      const userOwnsSend = await checkUserOwnSend(userId, sendId);

      if (!userExists) {
        res.status(404).send({ statusCode: 404, message: "user not found" });
        return next();
      }
      if (!problemExists) {
        res.status(404).send({ statusCode: 404, message: "problem not found" });
        return next();
      }
      if (!sendExists) {
        res.status(404).send({ statusCode: 404, message: "send not found" });
        return next();
      }
      if (!userOwnsSend) {
        res.status(401).send({ statusCode: 401, message: "cannot delete send not created by user" });
        return next();
      }

      await DeleteSend(sendId, userId, problemId);
      res.status(200).send(true);
      next();
    } catch (err) {
      console.error("Error in DeleteSend ", err);
      res.status(500).send({ statusCode: 500, message: "Could not delete send" });
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
async function checkSendExists(sendId) {
  const sendInfo = await GetSendInfo(sendId);
  let sendExists = false;

  if (sendInfo) {
    sendExists = true;
  }
  
  return sendExists;
}

async function checkUserOwnSend(userId, sendId) {
  const send = await CheckUserOwnsSend(userId, sendId);
  let userOwnsSend = false;

  if (send) {
    userOwnsSend = true;
  }

  return userOwnsSend;
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
      sendId: {
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
    required: ["problemId", "sendId", "user"],
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

export { deleteSend };
