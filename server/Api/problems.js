import { Router } from "express";
import { getAllProblems } from "../ServiceLayer/problems/GetProblems.js";
import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", getAllProblems());
problemsRouter.post("/problems/createProblem", createProblem());



export default problemsRouter;
