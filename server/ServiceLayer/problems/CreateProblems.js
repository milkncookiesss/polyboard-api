import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';


function createProblem() {
  return async (req, res, next) => {
    console.log(req.body);
    const { userId, name="", routePath, creatorNote="", weight="", grade="" } = req.body;
    console.log('-------> ', typeof routePath);
    // let testPath = [];
    try{
      const problem = await DB.createProblem(userId, routePath, weight, grade, name,creatorNote);
      res.send({ problem: problem }).status(200);
      next();
    } catch (err) {
      console.error("error on creating problem ", err);
      res.status(500).send(err.message);
      next();
    }

    // console.log('?????? ', problem);
    // console.log(JSON.parse(problem));

  }
}

function validateProblem() {

}

export { createProblem };
