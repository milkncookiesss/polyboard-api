import * as DB from '../../DataLayer/Services/problems/GetProblems.js';


function getProblems() {
  return async (req, res, next) => {
    const { headers, body } = req;
    // console.log(headers);
    // console.log(body);
    const testStr = "returing this thing hopefully please help me";
    console.log("we're hitting this service controller i think");
    const allProblems = await DB.getProblemsByUserId();


    res.send(allProblems).status(200);
    next();
  }
}


export { getProblems };
