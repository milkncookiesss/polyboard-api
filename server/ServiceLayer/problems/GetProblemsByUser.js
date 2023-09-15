import * as DB from '../../DataLayer/Services/problems/GetProblemsByUser.js';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

function getProblemsByUser() {
  return async (req, res, next) => {
    const { userId } = req.body;
    const userExists = await checkUserExists(userId);
    
    if (!userExists) {
      res.status(404).send({ message: "user was not found" });
      return next();
    }

    try {
      const allProblems = await DB.getProblemsByUser(userId);
  
      res.send({problems: allProblems}).status(200);
      next();
    } catch(err) {
      res.send("could not find problems").status(500);
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


export { getProblemsByUser };
