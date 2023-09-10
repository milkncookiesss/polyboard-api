import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const Problem = db.Problem;
const Sequelize = db.Sequelize;


// -------------------------------------------------------------------------- //
/**
 * create problem data layer
*/
async function createProblem(userId, route, weight, grade, name, creatorNote) {
  const problemId = uuid();
  const problem = {
    id: problemId,
    createdBy: userId,
    route,
    weight,
    name,
    creatorNote
  };
  try {
    await Problem.create(problem)
  } catch(err) {
    throw err;
  }

  return problem;
}

export { createProblem };
