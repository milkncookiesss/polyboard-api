import * as DB from '../../DataLayer/Services/users/DeleteUser.js';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

// -------------------------------------------------------------------------- //
/**
*/
function deleteUser() {
  return async (req, res, next) => {
    const { userId } = req.body;
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
      await DB.DeleteUser(userId);
      res.status(200).send(true);
      next();
    } catch(err) {
      res.status(500).send({ message: "could not delete user" });
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

export { deleteUser }
