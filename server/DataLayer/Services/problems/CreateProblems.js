import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const Problem = db.Problem;
const Sequelize = db.Sequelize;


// -------------------------------------------------------------------------- //
/**
 * create problem data layer
*/
async function createProblem(userId, routePath, weight, grade, name, creatorNote) {
  const problemId = uuid();
  const problem = {
    id: problemId,
    createdBy: userId,
    route: routePath,
    weight,
    name,
    creatorNote
  };
  try {
    await Problem.create(problem)
  } catch(err) {
    console.error(err);
    throw err;
  }

  return problem;
}

export { createProblem };
