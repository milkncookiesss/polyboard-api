import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

// -------------------------------------------------------------------------- //
/**
*/
function getUserById() {
  return async (req, res, next) => {
    const { userId } = req.body;
    console.log("==========================================")
    console.log(userId);
    console.log("==========================================")
    let user = null;
    user = await GetUserInfo(userId);

    if (!user) {
      res.status(404).send({ user: {} });
      return next();
    }
    res.status(200).send({ user });
    next();
  }
}

export { getUserById };
