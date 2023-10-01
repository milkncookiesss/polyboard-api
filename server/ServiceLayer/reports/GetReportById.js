import { GetReportById } from "../../DataLayer/Services/reports/GetReportById.js";

// -------------------------------------------------------------------------- //
/**
*/
function getReportById() {
  return async (req, res, next) => {
    const { role } = req.body.user;
    const { reportId } = req.query;
    if (reportId === null || reportId === "" || reportId === undefined) {
      res.status(404).send({ message: 'invalid id' });
      return next();
    }
    
    if (role !== 'admin') {
      res.status(401).send({ message: 'user is not an admin.' });
      return next();
    }
    
    try {
      const report = await GetReportById(reportId);
      if (!report) {
        res.status(404).send({ message: 'report does not exists' });
        return next();
      }

      res.status(200).send({ report });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'could not retrieve report' });
      next();
      throw new Error(err);
    }
  }
}

export { getReportById }
