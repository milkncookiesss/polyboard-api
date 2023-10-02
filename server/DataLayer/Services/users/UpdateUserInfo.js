import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function UpdateUserInfo(userId, updatePayload) {
  try {
    console.log('payload in data ', updatePayload);
    const updatedUser = await User.update(updatePayload, { where: { id: userId }, returning: true, raw: true});
    return updatedUser[1];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function CheckUserNameExists(username) {
  return await User.findOne({ where: { username }});
}
export { UpdateUserInfo, CheckUserNameExists }
