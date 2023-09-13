import * as DB from '../../DataLayer/Services/problems/GetProblemsByUser.js';


function getProblemsByUser() {
  return async (req, res, next) => {
    console.log("we're hitting this service controller i think");
    const { userId } = req.body;
    try {
      const allProblems = await DB.getProblemsByUser(userId);
  
      res.send({problems: allProblems}).status(200);
      next();
    } catch(err) {
      res.send("could not find problems").status(500);
      throw err;
    }
  }
}


export { getProblemsByUser };
