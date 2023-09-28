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
const usersRouter = Router();

usersRouter.get("/users/getUserById", getUserById());
usersRouter.get("/users/getUserBlockList", getUserBlockList());
usersRouter.post("/users/signUp", createUser());
usersRouter.post("/users/login", loginUser());
usersRouter.post("/users/logout", logOutUser());
usersRouter.post("/users/resetPassword", sendPasswordResetLink());
usersRouter.post("/users/blockUser", blockUser());
usersRouter.patch("/users/updatePassword", updatePassword());
usersRouter.delete("/users/delete", deleteUser());


export default usersRouter;
