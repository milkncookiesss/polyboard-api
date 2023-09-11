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
    const hashPassword = await createPasswordHash(password);
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
      
        console.log(comparePassword);
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

// -------------------------------------------------------------------------- //
/**
*/
async function createPasswordHash(password) {
  const salt = await bcrypt.genSalt(10);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: "could not hash password" });
  }
}

export { loginUser }
