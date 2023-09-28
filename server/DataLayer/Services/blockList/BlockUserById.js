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

  } catch (err) {
    
  }
}

export { BlockUserById }
