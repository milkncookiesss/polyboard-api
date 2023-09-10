import db from '../../models/index.js';
// import problems from '../../../MockProblems/MockProblems.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * Get All Problems by userId
 */
async function getAllProblems(offset, limit) {
  console.log('hello in data layer');
  
  try {
    const problems = await Problem.findAll({ order: [["createdAt", "DESC"]], raw: true });
    return problems;
    // return Problem.findAll({ order: [["createdAt", "DESC"]], raw: true });
  } catch(err) {
    throw err;
  }
  // return problems;
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

export { getAllProblems }
