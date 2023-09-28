import db from '../../models/index.js';

const BlockList = db.BlockList;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// -------------------------------------------------------------------------- //
/**
*/
async function GetUserBlockListById(userId) {
  console.log('yo dog we in the data layer of the get block list')
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
    return err;
  }
}

export {
  GetUserBlockListById
}
