import { GetAllUserSends } from "../../DataLayer/Services/sends/GetAllUserSends.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function getAllUserSends() {
  return async (req, res, next) => {
    const { userId } = req.query;

    if (userId === "") {
      res.status(400).send({ message: "no id was provided" });
      return next();
    }
    const userExists = await checkUserExists(userId);
    
    if (!userExists) {
      res.status(404).send({ message: "user was not found" });
      return next();
    }

    try {
      const sends = await GetAllUserSends(userId);
      res.status(200).send({ sends });
      next();
    } catch(err) {
      console.log(err);
      res.status(500).send({ message: "unable to get sends" });
      next();
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

export { getAllUserSends };
