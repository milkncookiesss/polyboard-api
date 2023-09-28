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
    return await BlockList.findAll({ where: { userId }, raw: true });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export {
  GetUserBlockListById
}
