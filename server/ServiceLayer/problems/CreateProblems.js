import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';


function createProblem() {
  return async (req, res, next) => {
    // console.log('the body ', typeof req.body);
    const { userId, routeName, routePath, creatorNote, weight, grade } = req.body;
    
    const problem = await DB.createProblem(userId, JSON.parse(routePath), JSON.parse(weight), grade, JSON.parse(routeName));

    // console.log('?????? ', problem);
    // console.log(JSON.parse(problem));
    res.send(problem).status(200);
    next();
  }
}


export { createProblem };
