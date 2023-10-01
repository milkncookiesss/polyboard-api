import { GetAllReports } from "../../DataLayer/Services/reports/GetAllReports.js";

// -------------------------------------------------------------------------- //
/**
*/
function getAllReports() {
  return async (req, res, next) => {
    const { role } = req.body.user;

    if (role !== 'admin') {
      res.status(401).send({ message: 'user is not an admin.' });
      return;
    }

    try {
      const reports = await GetAllReports();
      res.status(200).send({ reports });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'unable to get reports' });
      next();
      throw new Error(err);
    }
  }
}

export { getAllReports }
