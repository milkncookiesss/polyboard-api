import { DeleteSend } from "../../DataLayer/Services/sends/DeleteSend.js";
import { GetSendInfo } from "../../DataLayer/Services/sends/GetSendInfo.js"
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function deleteSend() {
  return async (req, res, next) => {
    const { userId } = req.body.user;
    const { problemId, sendId } = req.body;
    const sendExists = await checkSendExists(sendId);
    const userExists = await checkUserExists(userId);
    const problemExists = await checkProblemExists(problemId);

    if (!userExists) {
      res.status(404).send({ message: "user not found" });
      return next();
    }
    if (!problemExists) {
      res.status(404).send({ message: "problem not found" });
      return next();
    }
    if (!sendExists) {
      res.status(404).send({ message: "send not found" });
      return next();
    }

    try {
      await DeleteSend(sendId, userId, problemId);
      res.status(200).send(true);
      next();
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Could not delete send" });
      next();
      throw err
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

export { deleteSend };
