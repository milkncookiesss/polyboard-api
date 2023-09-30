import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';

// -------------------------------------------------------------------------- //
/**
 * create problem service layer
*/
function createProblem() {
  return async (req, res, next) => {
    const { name="", route, creatorNote="", weight="" } = req.body;
    const { userId } = req.body.user;
    try{
      const problem = await DB.createProblem(userId, route, weight, name, creatorNote);
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
