import * as DB from '../../DataLayer/Services/problems/GetProblems.js';


function getProblems() {
  return async (req, res, next) => {
    console.log("we're hitting this service controller i think");
    try {
      const { headers, body } = req;
      const allProblems = await DB.getAllProblems();
  
      res.send(allProblems).status(200);
      next();
    } catch(err) {
      
    }
  }
}


export { getProblems };
