import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const Problem = db.Problem;
const Sequelize = db.Sequelize;


// -------------------------------------------------------------------------- //
/**
 * create problem data layer
*/
async function createProblem(createdBy, route, weight, name, creatorNote) {
  const problemId = uuid();
  const problem = {
    id: problemId,
    createdBy,
    route,
    weight,
    name,
    creatorNote
  };
  try {
    return await Problem.create(problem, { raw: true })
  } catch(err) {
    console.error(err);
    throw err;
  }

  return problem;
}

export { createProblem };
