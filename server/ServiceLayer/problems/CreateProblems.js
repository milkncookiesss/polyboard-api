import * as DB from '../../DataLayer/Services/problems/CreateProblems.js';


function createProblem() {
  return async (req, res, next) => {
    console.log(req.body);
    const { userId, routeName="", routePath, creatorNote="", weight="", grade="" } = req.body;
    // let testPath = [];
    try{
      if (routePath.length < 1) {
        routePath = "";
      }
      const problem = await DB.createProblem(JSON.parse(userId), routePath, JSON.parse(weight), grade, JSON.parse(routeName), JSON.parse(creatorNote));
      res.send({ problem: problem }).status(200);
      next();
    } catch (err) {
      console.error("error on creating problem ", err);
      res.status(500);
      next();
    }

    // console.log('?????? ', problem);
    // console.log(JSON.parse(problem));

  }
}


export { createProblem };
