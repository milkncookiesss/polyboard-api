import db from '../../models/index.js';

const User = db.User;
const Passwordresetcode = db.Passwordresetcode;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = Sequelize.Op;

async function UpdatePassword(email, password) {

  return sequelize.transaction(async (transaction) => {
    try {
      await User.update({ password }, { where: { email }, transaction })
    } catch (err) {
      console.log(err);
      transaction.rollback();
      throw err;
    }
  });
}

async function DeleteUserPasswordResetCodeRecords(email) {
  return sequelize.transaction(async (transaction) => {
    try {
      await Passwordresetcode.destroy({ where: { email } });
    } catch (err) {
      console.error(err);
      transaction.rollback();
      throw err;
    }
  })
}

async function ResetCodeExistsForUser(email, code) {
  return await Passwordresetcode.findOne({ where: { email, code } });
}

export { 
  UpdatePassword, 
  DeleteUserPasswordResetCodeRecords,
  ResetCodeExistsForUser
}
