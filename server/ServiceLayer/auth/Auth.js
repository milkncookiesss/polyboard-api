import JsonWebToken from 'jsonwebtoken';
import { GetUserInfo } from '../../DataLayer/Services/users/GetUserInfo.js';

function auth() {
  return async (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;

    if (authHeader === null || authHeader === "" || !authHeader) {
      res.status(401).send({ message: "no token provided" });
      return;
    }

    const decoded = await JsonWebToken.verify(
      authHeader, 
      secret,
      (err, decoded) => {
        if (err) {
          console.error(err);
          res.status(404).send({ message: "token not provided" });
          throw new Error(err);
        }

        return decoded;
      })

    if (decoded === null) {
      res.status(401).send({ message: "unauthorized request" });
      return;
    }
    const userId = decoded.user.id;
    const userExists = await checkUserExists(userId);
    if (!userExists) {
      res.status(404).send({ message: "aurthorized user not found" });
      return;
    }

    req.body.user = { userId };
    next();
  }
}

// -------------------------------------------------------------------------- //
/**
*/
async function sign(userId, email) {
  const secret = process.env.JWT_SECRET;

  const payload = {
    user: {
      id: userId,
      email
    }
  };

  const token = JsonWebToken.sign(payload, secret);
  return token;
}

// -------------------------------------------------------------------------- //
/**
*/
async function checkUserExists(userId) {
  const userInfo = await GetUserInfo(userId);
  let userExists = false;
  
  if (userInfo) {
    userExists = true;
  }

  return userExists;
}


export { auth, sign }
