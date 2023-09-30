import { GetUserBlockListById } from "../../DataLayer/Services/blockList/GetUserBlockList.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

// -------------------------------------------------------------------------- //
/**
*/
function getUserBlockList() {
  return async (req, res, next) => {
    console.log('yo dawg we in the service for getting an user block list')
    const { userId } = req.body.user;
    const userExists = await ValidateUserExists(userId);

    if (!userExists) {
      res.status(404).send({ message: "user does not exist" });
      return next();
    }

    try {
      const blockList = await GetUserBlockListById(userId);
      res.status(200).send({ blockList });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: "could not get block list" });
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

export { getUserBlockList }
