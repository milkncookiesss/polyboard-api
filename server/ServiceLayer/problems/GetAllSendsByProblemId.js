import { GetAllSendsByProblemId } from "../../DataLayer/Services/problems/GetProblemById.js";
import { GetProblemInfo } from "../../DataLayer/Services/problems/GetProblemInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function getAllSendsByProblemId() {
  return async (req, res, next) => {
    const { problemId } = req.query;
    const problemExists = await ValidateProblemExists(problemId);

    if (!problemExists) {
      res.status(404).send({ message: "problem not found" });
      return next();
    }

    try {
      const sends = await GetAllSendsByProblemId(problemId);
      res.status(200).send( { sends });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "could not get sends for problem" });
      next();
      throw err;
    }
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function ValidateProblemExists(problemId) {
  const problemInfo = await GetProblemInfo(problemId);
  let problemExists = false;
  
  if (problemInfo) {
    problemExists = true;
  }

  return problemExists;
}

export { getAllSendsByProblemId }
