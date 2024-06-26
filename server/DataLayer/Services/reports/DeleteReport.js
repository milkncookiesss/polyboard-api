import db from '../../models/index.js';

const Report = db.Report;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteReportById(id) {
  try {
    return await Report.destroy({ where: { id }});
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}


export { DeleteReportById }
