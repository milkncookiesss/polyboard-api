import { Router } from "express";
import { getAllProblems } from "../ServiceLayer/problems/GetProblems.js";
import { getAllUserSends } from "../ServiceLayer/sends/GetAllUserSends.js";
import { getProblemsByUser } from "../ServiceLayer/problems/GetProblemsByUser.js";
import { createSend } from "../ServiceLayer/sends/CreateSend.js";
import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";
import { deleteSend } from "../ServiceLayer/sends/DeleteSend.js";
import { deleteProblemsFromUserById } from "../ServiceLayer/problems/DeleteProblemsFromUserId.js"

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", getAllProblems());
problemsRouter.get("/problems/getProblemsFromUser", getProblemsByUser());
problemsRouter.get("/problems/getAllUserSends", getAllUserSends());
problemsRouter.post("/problems/createProblem", createProblem());
problemsRouter.post("/problems/createSend", createSend());
problemsRouter.delete("/problems/deleteProblem", deleteProblemsFromUserById());
problemsRouter.delete("/problems/deleteSend", deleteSend());

export default problemsRouter;
