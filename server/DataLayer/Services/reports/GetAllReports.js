import db from '../../models/index.js';

const Report = db.Report;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetAllReports() {
  try {
    return await Report.findAll({ raw: true });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export { GetAllReports }
