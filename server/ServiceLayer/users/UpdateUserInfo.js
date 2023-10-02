import { UpdateUserInfo, CheckUserNameExists } from "../../DataLayer/Services/users/UpdateUserInfo.js";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo.js";

function updateUserInfo() {
  return async (req, res, next) => {
    const { username="", displayname="" } = req.body;
    const { userId } = req.body.user;
    const userExists = await CheckUserExists(userId);
    const userNameExists = await UserNameValidator(username);

    if (!userExists) {
      res.status(404).send({ message: "user does not exist" });
      return next();
    }
    if (userNameExists) {
      res.status(409).send({ message: 'username already exists' });
      return next();
    }

    try {
      const updatePayload = {};
      for (const field in req.body) {
        if (req.body[field] !== "") {
          updatePayload[field] = req.body[field];
        }
      }
      delete updatePayload.user;
      
      await UpdateUserInfo(userId, updatePayload);
      res.status(200).send({ message: 'user info updated' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'could not update user' });
      throw err;
    }
    next();
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function UserNameValidator(username) {
  const userNameExists = await CheckUserNameExists(username);
  let exists = false;

  if (userNameExists) {
    exists = true;
  }

  return exists;
}

// -------------------------------------------------------------------------- //
/**
*/
async function CheckUserExists(userId) {
  const userInfo = await GetUserInfo(userId);
  let userExists = false;
  
  if (userInfo) {
    userExists = true;
  }

  return userExists;
}

export { updateUserInfo }
