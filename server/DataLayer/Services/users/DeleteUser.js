import db from '../../models/index.js';

const User = db.User;
const Problem = db.Problem;
const Send = db.Send;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteUser(id) {
  return sequelize.transaction(async (transaction) => {
    try {
      await Promise.all([
        DeleteUserProblems(id, transaction),
        DeleteUserSends(id, transaction),
        await User.destroy({ where: { id }, transaction})
      ]);
    } catch (err) {
      console.log(err);
      transaction.rollback();
      throw err;
    }
  });
}

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteUserProblems(createdBy, transaction) {
  return await Problem.destroy({ where: { createdBy }, transaction});
}

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteUserSends(userId, transaction) {
  return await Send.destroy({ where: { userId }, transaction});
}
export { 
  DeleteUser,
  DeleteUserProblems,
  DeleteUserSends
};
