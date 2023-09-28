import db from '../../models/index.js';

const BlockList = db.BlockList;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function UnBlockUserById(userId, blockedUserId) {
  try {
    await BlockList.destroy({ where: { userId, blockedUserId }});
  } catch (err) {
    console.error(err);
    return err;
  }
}

export { UnBlockUserById }
