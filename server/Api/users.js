import { Router } from "express";
import { createUser } from "../ServiceLayer/users/Createuser.js";
import { loginUser } from "../ServiceLayer/users/LoginUser.js";

const usersRouter = Router();

usersRouter.post("/users/signUp", createUser());
usersRouter.post("/users/login", loginUser());



export default usersRouter;
