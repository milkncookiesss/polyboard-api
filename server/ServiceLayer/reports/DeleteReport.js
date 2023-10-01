import { DeleteReportById } from "../../DataLayer/Services/reports/DeleteReport.js";
import { GetReportById } from "../../DataLayer/Services/reports/GetReportById.js";

// -------------------------------------------------------------------------- //
/**
*/
function deleteReport() {
  return async (req, res, next) => {
    const { role } = req.body.user;
    const { reportId } = req.body;
    if (reportId === null || reportId === "" || reportId === undefined) {
      res.status(404).send({ message: 'invalid id' });
      return next();
    }
    const reportExists = await ValidateReportId(reportId);

    if (role !== 'admin') {
      res.status(401).send({ message: 'user is not an admin.' });
      return next();
    }
    if (!reportExists) {
      res.status(404).send({ message: 'report does not exists' });
      return next();
    }

    try {
      await DeleteReportById(reportId);
      res.status(200).send({ message: 'report deleted' });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'could not delete report' });
      next();
      throw new Error(err);
    }
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function ValidateReportId(id) {
  const reportInfo = await GetReportById(id);
  let reportExists = false
  if (reportInfo) {
    reportExists = true;
  }

  return reportExists;
}

export { deleteReport };
