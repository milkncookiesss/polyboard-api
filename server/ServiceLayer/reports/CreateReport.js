import { CreateReport } from "../../DataLayer/Services/reports/CreateReport.js";

// -------------------------------------------------------------------------- //
/**
*/
function createReport() {
  return async (req, res, next) => {
    const { reportType, reporter, comment } = req.body;
    console.log('inside create report service');
    try {
      await CreateReport(reportType, reporter, comment);
      res.status(200).send(true);
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
      next();
    }
  }
}

export {
  createReport
}
