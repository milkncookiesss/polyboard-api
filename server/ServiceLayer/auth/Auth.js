import JsonWebToken from 'jsonwebtoken';

function auth() {
  return async (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    const authHeader = req.headers.authorization;

    const decoded = await JsonWebToken.verify(
      authHeader, 
      secret,
      (err, decoded) => {
        if (err) {
          console.error(err);
          throw new Error(err);
        }

        return decoded;
      })

    if (decoded === null) {
      res.status(401).send({ message: "unauthorized request" });
      return;
    }

    const userId = decoded.user.id;

    req.body.userId = userId;
    next();
  }
}

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


export { auth, sign }
