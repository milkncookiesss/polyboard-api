import { Router } from "express";
import { getProblems } from "../ServiceLayer/problems/GetProblems.js";

const problemsRouter = Router();

problemsRouter.get("/problems/getProblems", getProblems());

export default problemsRouter;
