import { Router } from "express";
import { createReport } from "../ServiceLayer/reports/CreateReport.js";

const reportsRouter = Router();

reportsRouter.post('/reports/createReport', createReport());

export default reportsRouter;
