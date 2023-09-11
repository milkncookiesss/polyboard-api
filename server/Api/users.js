import { Router } from "express";
import { createUser } from "../ServiceLayer/users/Createuser.js";
import { loginUser } from "../ServiceLayer/users/LoginUser.js";
// import { getAllProblems } from "../ServiceLayer/problems/GetProblems.js";
// import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";

const usersRouter = Router();

usersRouter.post("/users/signUp", createUser());
usersRouter.post("/users/login", loginUser());
// usersRouter.post("/users/deleteUser", deleteUser());



export default usersRouter;
