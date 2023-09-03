import db from '../../models/index.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * Get All Problems by userId
 */
async function getProblemsByUserId(userId, offset, limit) {
  return ['a','b','c','d']
  // return Problem.findAll({
  //   where: {
  //     userId
  //   },
  //   offset,
  //   limit,
  //   attributes: ["id"],
  //   order: [["createdAt", "DESC"]],
  //   raw: true
  // });
}

export { getProblemsByUserId }
