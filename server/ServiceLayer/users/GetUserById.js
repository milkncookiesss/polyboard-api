import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

// -------------------------------------------------------------------------- //
/**
*/
function getUserById() {
  return async (req, res, next) => {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).send({ message: "Bad Request" });
      return next();
    }
    let user = null;
    try {
      user = await GetUserInfo(userId);
    } catch(err) {
      res.status(500).send({ message: "server err" })
      return next();
    }

    if (!user) {
      res.status(404).send({ user: {} });
      return next();
    }
    res.status(200).send({ user });
    next();
  }
}

export { getUserById };
