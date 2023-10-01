import db from '../../models/index.js';

const Report = db.Report;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function GetReportById(id) {
  try {
    return await Report.findOne({ where: { id }, raw: true });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export { GetReportById }
