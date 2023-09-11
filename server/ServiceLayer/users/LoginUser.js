import bcrypt, { compare } from 'bcrypt';
import * as DB from '../../DataLayer/Services/users/LoginUser.js';
import { validateEmail } from '../../Helpers/emailValidation.js';
// -------------------------------------------------------------------------- //
/**
 * 
*/
function loginUser() {
  return async (req, res, next) => {
    console.log("in login");
    const { email, password } = req.body;
    const validEmail = validateEmail(email);
    if (!validEmail) {
      res.status().send();
      return next();
    }
    const userInfo = await DB.GetUserInfo(email);
    try {
      const comparePassword = await bcrypt.compare(
        password, 
        userInfo.password
        )
        .then(res => res)
        .catch(err => { throw err });
      
      if (!comparePassword) {
        res.status(401).send({ message: "incorrect password or email" });
        return next();
      }
      res.status(200).send(userInfo);
    } catch (err) {
      console.log(err);
      res.status(400).send({ message: "user does not exist" });
    }
    next();
  }

}

export { loginUser }
