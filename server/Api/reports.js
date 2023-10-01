import { Router } from "express";
import { createReport } from "../ServiceLayer/reports/CreateReport.js";
import { getAllReports } from "../ServiceLayer/reports/GetAllReports.js";
import { getReportById } from "../ServiceLayer/reports/GetReportById.js";
import { deleteReport } from "../ServiceLayer/reports/DeleteReport.js";
import { auth } from "../ServiceLayer/auth/Auth.js";

const reportsRouter = Router();

reportsRouter.get("/reports/getAllReports", auth(), getAllReports());
reportsRouter.get("/reports/getReportById", auth(), getReportById());
reportsRouter.post("/reports/createReport", auth(), createReport());
reportsRouter.delete("/reports/deleteReport", auth(), deleteReport());

export default reportsRouter;
