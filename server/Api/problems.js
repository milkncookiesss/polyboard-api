import { Router } from "express";
import { getProblems } from "../ServiceLayer/problems/GetProblems.js";
import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", getProblems());
problemsRouter.post("/problems/createProblem", createProblem());



export default problemsRouter;
