import db from '../../models/index.js';

const BlockList = db.BlockList;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserBlockListById(userId) {
  try {
    const blockList = await BlockList.findAll(
      { 
        attributes: ["blockedUserId"],
        where: { userId }, 
        order: [["createdAt", "DESC"]],
        raw: true 
      });
    return blockList;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export {
  GetUserBlockListById
}
