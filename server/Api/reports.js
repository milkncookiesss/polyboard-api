import { Router } from "express";
import { createReport } from "../ServiceLayer/reports/CreateReport.js";
import { auth } from "../ServiceLayer/auth/Auth.js";

const reportsRouter = Router();

reportsRouter.post('/reports/createReport', auth(), createReport());

export default reportsRouter;
