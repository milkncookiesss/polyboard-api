import { DeleteProblemsFromUserId } from "../../DataLayer/Services/problems/DeleteProblemsFromUserId";
import { GetUserInfo } from "../../DataLayer/Services/users/GetUserInfo";

// -------------------------------------------------------------------------- //
/**
*/
function deleteProblemsFromUserById() {
  return async (req, res, next) => {
    const { userId, id } = req.body;

    const userExists = await checkUserExists(userId);
    if (!userExists) {
      res.status(404).send({ message: "user not found" });
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

export { deleteProblemsFromUserById };
