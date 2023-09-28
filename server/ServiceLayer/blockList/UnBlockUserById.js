import { UnBlockUserById } from "../../DataLayer/Services/blockList/UnBlockUserById.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";


function unBlockUser() {
  return async (req, res, next) => {
    const { userId, blockedUserId } = req.body;
    const userExists = await ValidateUserExists(userId);
    const blockedUserExists = await ValidateUserExists(blockedUserId);

    if (!userExists) {
      res.status(404).send({ message: "user does not exist" });
      return next();
    }
    if (!blockedUserExists) {
      res.status(404).send({ message: "blocked user does not exist" });
      return next();
    }

    try {
      await UnBlockUserById(userId, blockedUserId);
      res.status(200).send({ message: "unblocked user" });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "could not unblock user" });
      next();
      throw new Error(err);
    }

  }
}


// -------------------------------------------------------------------------- //
/**
*/
async function ValidateUserExists(userId) {
  const userInfo = await GetUserInfo(userId);
  let userExists = false;
  
  if (userInfo) {
    userExists = true;
  }

  return userExists;
}

export { unBlockUser }
