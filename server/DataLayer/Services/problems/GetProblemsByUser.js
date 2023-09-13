import db from '../../models/index.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * Get All Problems by userId
 */
async function getProblemsByUser(createdBy) {
  try {
    const problems = await Problem.findAll({ where: { createdBy },order: [["createdAt", "DESC"]], raw: true });
    return problems;
  } catch(err) {
    throw err;
  }
}

export { getProblemsByUser }
