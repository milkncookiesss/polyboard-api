import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function UpdateUserInfo(userId, username, displayname) {
  try {
    await User.update({ username, displayname}, { where: { id: userId }});
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function CheckUserNameExists(userName) {
  return await User.findOne({ where: { username: userName }});
}
export { UpdateUserInfo, CheckUserNameExists }
