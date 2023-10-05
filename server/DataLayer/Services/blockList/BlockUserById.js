import db from '../../models/index.js';

const BlockList = db.BlockList;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function BlockUserById(userId, blockedUserId) {
  console.log('blocking user inside data layer')
  try {
    await BlockList.create({ userId, blockedUserId });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export { BlockUserById }
