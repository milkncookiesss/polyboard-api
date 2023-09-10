import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';

// -------------------------------------------------------------------------- //
/**
 * create problem service layer
*/
function createProblem() {
  return async (req, res, next) => {
    console.log(req.body);
    const { userId, name="", route, creatorNote="", weight="", grade="" } = req.body;
    console.log('-------> ', typeof route);
    // let testPath = [];
    try{
      const problem = await DB.createProblem(userId, route, weight, grade, name,creatorNote);
      res.send({ problem: problem }).status(200);
      next();
    } catch (err) {
      console.error("error on creating problem ", err);
      res.status(500).send(err.message);
      next();
    }
  }
}

function validateProblem() {

}

export { createProblem };
