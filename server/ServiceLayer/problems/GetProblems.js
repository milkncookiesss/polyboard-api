import * as DB from '../../DataLayer/Services/problems/GetProblems.js';


function getAllProblems() {
  return async (req, res, next) => {
    console.log("we're hitting this service controller i think");
    try {
      const allProblems = await DB.getAllProblems();
  
      res.send(allProblems).status(200);
      next();
    } catch(err) {
      throw err;
      res.send("could not find problems").status(500);
    }
  }
}


export { getAllProblems };
