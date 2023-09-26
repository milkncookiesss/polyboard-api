import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const Report = db.Report;
const Sequelize = db.Sequelize;

async function CreateReport(reportType, reporter, reportId, comment) {
  console.log('inside create report data');

  const id = uuid();
  const report = {
    id,
    reportType,
    reporter,
    reportId,
    comment
  };

  try {
    return await Report.create(report, { raw: true });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export {
  CreateReport
}
