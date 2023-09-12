import { Router } from "express";
import { createUser } from "../ServiceLayer/users/Createuser.js";
import { loginUser } from "../ServiceLayer/users/LoginUser.js";
import { deleteUser } from "../ServiceLayer/users/DeleteUser.js";
const usersRouter = Router();

usersRouter.post("/users/signUp", createUser());
usersRouter.post("/users/login", loginUser());
usersRouter.delete("/users/delete", deleteUser());


export default usersRouter;
