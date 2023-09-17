import db from '../../models/index.js';

const User = db.User;
const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteUser(id) {
  return await User.destroy({ where: { id }});
}

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteUserProblems(createdBy) {
  return await Problem.destroy({ where: { createdBy }});
}

// -------------------------------------------------------------------------- //
/**
*/
async function DeleteUserSends(userId) {
  return await Send.destroy({ where: { userId }});
}
export { 
  DeleteUser,
  DeleteUserProblems,
  DeleteUserSends
};
