import db from '../../models/index.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * Get All Problems
 */
async function getAllProblems(offset, limit) {
  console.log('hello in data layer');
  
  try {
    const problems = await Problem.findAll({ order: [["createdAt", "DESC"]], raw: true });
    console.log('the problems ', problems);
    return problems;
  } catch(err) {
    throw err;
  }
}

export { getAllProblems }
