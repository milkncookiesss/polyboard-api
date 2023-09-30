import { Router } from "express";
import { getAllProblems } from "../ServiceLayer/problems/GetProblems.js";
import { getAllUserSends } from "../ServiceLayer/sends/GetAllUserSends.js";
import { getProblemById } from "../ServiceLayer/problems/GetProblemById.js";
import { getProblemsByUser } from "../ServiceLayer/problems/GetProblemsByUser.js";
import { createSend } from "../ServiceLayer/sends/CreateSend.js";
import { createProblem } from "../ServiceLayer/problems/CreateProblems.js";
import { deleteSend } from "../ServiceLayer/sends/DeleteSend.js";
import { deleteProblemsFromUserById } from "../ServiceLayer/problems/DeleteProblemsFromUserId.js"
import { auth } from "../ServiceLayer/auth/Auth.js";

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", auth(), getAllProblems());
problemsRouter.get("/problems/getProblemsFromUser", auth(), getProblemsByUser());
problemsRouter.get("/problems/getAllUserSends", auth(), getAllUserSends());
problemsRouter.get("/problems/getProblemById", auth(), getProblemById());
problemsRouter.post("/problems/createProblem", auth(), createProblem());
problemsRouter.post("/problems/createSend", auth(), createSend());
problemsRouter.delete("/problems/deleteProblem", auth(), deleteProblemsFromUserById());
problemsRouter.delete("/problems/deleteSend", auth(), deleteSend());

export default problemsRouter;
