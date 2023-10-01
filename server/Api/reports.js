import { Router } from "express";
import { createReport } from "../ServiceLayer/reports/CreateReport.js";
import { getAllReports } from "../ServiceLayer/reports/GetAllReports.js";
import { auth } from "../ServiceLayer/auth/Auth.js";

const reportsRouter = Router();

reportsRouter.get("/reports/getAllReports", auth(), getAllReports());
reportsRouter.post("/reports/createReport", auth(), createReport());

export default reportsRouter;
