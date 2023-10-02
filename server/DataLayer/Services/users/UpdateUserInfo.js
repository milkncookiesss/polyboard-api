import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function UpdateUserInfo(userId, updatePayload) {
  try {
    console.log('payload in data ', updatePayload);
    await User.update(
      updatePayload, 
      { 
        where: { 
          id: userId 
        }});
    const updatedUser = await User.findOne(
      { 
        where: {
          id: userId
        },
        attributes: [
          'id',
          'username',
          'displayname',
          'email',
          'createdAt'
        ],
        raw: true
      }
    )
    return updatedUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function CheckUserNameExists(username) {
  return await User.findOne({ where: { username }});
}
export { UpdateUserInfo, CheckUserNameExists }
