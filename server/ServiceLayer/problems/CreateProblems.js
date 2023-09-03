import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';


function createProblem() {
  return async (req, res, next) => {
    console.log(req.body);
    const { userId, routeName, routePath, creatorNote, weight, grade } = req.body;
    // let testPath = [];
    const problem = await DB.createProblem(JSON.parse(userId), routePath, weight, grade, JSON.parse(routeName), JSON.parse(creatorNote));

    // console.log('?????? ', problem);
    // console.log(JSON.parse(problem));

    res.send({ problem: problem }).status(200);
    next();
  }
}


export { createProblem };
