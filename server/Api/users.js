import { Router } from "express";
import { createUser } from "../ServiceLayer/users/Createuser.js";
import { loginUser } from "../ServiceLayer/users/LoginUser.js";
import { deleteUser } from "../ServiceLayer/users/DeleteUser.js";
import { logOutUser } from "../ServiceLayer/users/LogOutUser.js";
import { getUserById } from "../ServiceLayer/users/GetUserById.js";
const usersRouter = Router();

usersRouter.get("/users/getUserById", getUserById());
usersRouter.post("/users/signUp", createUser());
usersRouter.post("/users/login", loginUser());
usersRouter.post("/users/logout", logOutUser());
usersRouter.delete("/users/delete", deleteUser());


export default usersRouter;