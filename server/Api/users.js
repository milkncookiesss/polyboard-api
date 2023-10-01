import { Router } from "express";
import { createUser } from "../ServiceLayer/users/Createuser.js";
import { loginUser } from "../ServiceLayer/users/LoginUser.js";
import { deleteUser } from "../ServiceLayer/users/DeleteUser.js";
import { logOutUser } from "../ServiceLayer/users/LogOutUser.js";
import { getUserById } from "../ServiceLayer/users/GetUserById.js";
import { sendPasswordResetLink } from "../ServiceLayer/passwords/ResetPassword.js";
import { updatePassword } from "../ServiceLayer/passwords/UpdatePassword.js";
import { getUserBlockList } from "../ServiceLayer/blockList/GetUserBlockList.js";
import { blockUser } from "../ServiceLayer/blockList/BlockUserById.js";
import { unBlockUser } from "../ServiceLayer/blockList/UnBlockUserById.js";
import { getAllUsers } from "../ServiceLayer/users/GetAllUsers.js";
import { auth } from "../ServiceLayer/auth/Auth.js";
const usersRouter = Router();

usersRouter.get("/users/getAllUsers", auth(), getAllUsers());
usersRouter.get("/users/getUserById", auth(), getUserById());
usersRouter.get("/users/getUserBlockList", auth(), getUserBlockList());
usersRouter.post("/users/signUp", createUser());
usersRouter.post("/users/login", loginUser());
usersRouter.post("/users/logout", auth(), logOutUser());
usersRouter.post("/users/resetPassword", sendPasswordResetLink());
usersRouter.post("/users/blockUser", auth(), blockUser());
usersRouter.patch("/users/updatePassword", updatePassword());
usersRouter.delete("/users/unBlockUser", auth(), unBlockUser());
usersRouter.delete("/users/delete", auth(), deleteUser());


export default usersRouter;
