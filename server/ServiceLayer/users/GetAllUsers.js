import { GetAllUsers } from "../../DataLayer/Services/users/GetAllUsers.js";

// -------------------------------------------------------------------------- //
/**
*/
function getAllUsers() {
  return async (req, res, next) => {
    try {
      const users = await GetAllUsers();
      res.status(200).send({ users });
      next();
    } catch (err) {
      res.status(500).send({ message: "could not retrieve users" });
      next();
      throw new Error(err);
    }
  }
}

export { getAllUsers };
