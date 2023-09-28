import db from '../../models/index.js';

const User = db.User;
const Passwordresetcode = db.Passwordresetcode;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function UpdatePassword(email, password) {
  console.log('hitting up data layer');
}

async function DeleteUserPasswordResetCodeRecords(email) {
  console.log('going to delete all the records here');
}

async function ResetCodeExistsForUser(email, code) {
  return await Passwordresetcode.findOne({ where: { email, code } });
}

export { 
  UpdatePassword, 
  DeleteUserPasswordResetCodeRecords,
  ResetCodeExistsForUser
}
