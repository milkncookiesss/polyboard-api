import { CreateSend } from "../../DataLayer/Services/sends/CreateSend.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function createSend() {
  return async (req, res, next) => {
    const { userId, problemId, note, rating, grade } = req.body;
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

    try {
      const send = await CreateSend(userId, problemId, note, rating, grade);
      res.status(200).send({ send });
      next();
    } catch(err) {
      console.error("could not create send");
      res.status(500).send(err.message);
      throw err;
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
export { createSend }
