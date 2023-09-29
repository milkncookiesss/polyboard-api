import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';
import { UpdateUserTokenAtLogOut } from '../../DataLayer/Services/users/LogOutUser.js';

// -------------------------------------------------------------------------- //
/**
*/
function logOutUser() {
  return async (req, res, next) => {
    const { userId } = req.body;
    const userExists = await checkUserExists(userId);

    if (!userExists) {
      res.status(404).send({ message: "user was not found" });
      return next();
    }

    await UpdateUserTokenAtLogOut(userId);
    res.status(200).send({});
    next();
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

export { logOutUser };
