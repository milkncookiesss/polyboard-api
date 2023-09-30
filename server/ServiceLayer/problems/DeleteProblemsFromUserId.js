import { DeleteProblemsFromUserId } from "../../DataLayer/Services/problems/DeleteProblemsFromUserId.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function deleteProblemsFromUserById() {
  return async (req, res, next) => {
    const { userId } = req.body.user;
    const { problemId } = req.body;

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
      await DeleteProblemsFromUserId(userId, problemId);
      res.status(200).send(true);
      next();
    } catch(err) {
      res.status(500).send(err);
      next()
      throw err;
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

export { deleteProblemsFromUserById };
