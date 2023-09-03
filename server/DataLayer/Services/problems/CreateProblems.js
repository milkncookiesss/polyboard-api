import db from '../../models/index.js';
import problems from '../../../MockProblems/MockProblems.js';

const Problem = db.Problem;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;
const now = new Date();

/**
 * User Creates Problem
 */

async function createProblem(userId, routePath, weight, grade, routeName, creatorNote) {
  let problemsList = problems.problems;
  let lastId = parseInt(problemsList[problemsList.length - 1].id) + 1;
  let lastIdString = lastId.toString();
  // console.log(routePath);
  // routePath.replace(/\[|\]/g,"").split(',')
  // userId = parseInt(userId);
  const problem = { id: lastIdString, routeName, userId, creatorNote, routePath, weight, createdAt: now, updatedAt: now };
  // console.log('db layer ',problem)
  problemsList.push(problem);

  return problem;
}

export { createProblem };
