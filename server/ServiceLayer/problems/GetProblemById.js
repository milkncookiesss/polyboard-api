import * as DB from "../../DataLayer/Services/problems/GetProblemById.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";
// -------------------------------------------------------------------------- //
/**
*/
function getProblemById() {
  return async (req, res, next) => {
    const { problemId } = req.body;
    const problemExists = await checkProblemExists(problemId);
    if (!problemExists) {
      res.status(404).send({ message: "problem not found" });
      return next();
    }

    try {
      const problem = await DB.GetProblemById(problemId);
      const sends = await DB.GetAllSendsByProblemId(problemId);
      problem.sends = sends;

      res.status(200).send({ problem });
      next();
    } catch(err) {
      console.log(err);
      next();
      throw err;
    }
  }
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

export { getProblemById };
