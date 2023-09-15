import { Router } from "express";
import { getAllProblems } from "../ServiceLayer/problems/GetProblems.js";
import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";
import { getProblemsByUser } from "../ServiceLayer/problems/GetProblemsByUser.js";
import { deleteProblemsFromUserById } from "../ServiceLayer/problems/DeleteProblemsFromUserId.js"
import { createSend } from "../ServiceLayer/problems/CreateSend.js";

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", getAllProblems());
problemsRouter.get("/problems/getProblemsFromUser", getProblemsByUser());
problemsRouter.post("/problems/createProblem", createProblem());
problemsRouter.post("/problems/createSend", createSend());
problemsRouter.delete("/problems/deleteProblem", deleteProblemsFromUserById());


export default problemsRouter;
