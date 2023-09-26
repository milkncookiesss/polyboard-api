import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const Report = db.Report;
const Sequelize = db.Sequelize;

async function CreateReport(reportType, reporter, comment) {
  console.log('inside create report data');
}

export {
  CreateReport
}
