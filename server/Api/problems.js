import { Router } from "express";
import { getAllProblems } from "../ServiceLayer/problems/GetProblems.js";
import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";
import { getProblemsByUser } from "../ServiceLayer/problems/GetProblemsByUser.js";

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", getAllProblems());
problemsRouter.get("/problems/getProblemsFromUser", getProblemsByUser());
problemsRouter.post("/problems/createProblem", createProblem());



export default problemsRouter;
