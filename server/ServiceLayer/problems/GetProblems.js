
function getProblems() {
  return async (req, res, next) => {
    const { headers, body } = req;
    // console.log(headers);
    // console.log(body);
    const testStr = "returing this thing hopefully please help me";
    console.log("we're hitting this service controller i think");
    res.send(testStr).status(200);
    next();
  }
}


export { getProblems };
