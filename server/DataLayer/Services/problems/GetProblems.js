import db from '../../models/index.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * Get All Problems
 */
async function getAllProblems(offset, limit) {
  try {
    const problems = await Problem.findAll({ order: [["createdAt", "DESC"]], raw: true });
    return problems;
  } catch(err) {
    throw err;
  }
}

export { getAllProblems }
