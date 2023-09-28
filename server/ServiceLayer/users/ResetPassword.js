import nodemailer from 'nodemailer';
import { GetUserInfoByEmail } from '../../DataLayer/Services/users/GetUserInfo.js';
const hostEmail = process.env.HOST_EMAIL;
const emailPassword = process.env.HOST_EMAIL_PASSWORD;
const emailPort = process.env.GMAIL_PORT;
const emailHost = process.env.SMTP_HOST;

function sendPasswordResetLink() {
  return async (req, res, next) => {
    const { userEmail } = req.body;
    const userExists = await CheckUserExists(userEmail);

    if (!userExists) {
      res.status(404).send({ message: "user does not exist" });
      return next();
    }
    try {
      const transporter = nodemailer.createTransport({
        port: emailPort,
        host: emailHost,
        auth: {
          user: hostEmail,
          pass: emailPassword
        },
        secure: false,
        requireTLS: true
      });
  
      const mailData = {
        from: hostEmail,
        to: userEmail,
        subject: 'Polyboard Password Reset',
        text: `<b>Hello this is an automated email to reset your password.</b>
        <br>Please use this link to enter back into the Polyboard App and continue the process to reset your password: <a hfref="https://polyboard-api-1b8900100f27.herokuapp.com/api/deeplink?url=fingerclimbing://forgetpassword/">here</a></br>`,
        html: `
        <b>Hello this is an automated email to reset your password.</b>
        <br>Please use this link to enter back into the Polyboard App and continue the process to reset your password: <a href="https://polyboard-api-1b8900100f27.herokuapp.com/api/deeplink?url=fingerclimbing://forgetpassword/">here</a></br>`,
      };
  
      const info = await transporter.sendMail(mailData);
      res.status(200).send(true);
    } catch (err) {
      console.log(err);
      res.status(500).send(false);
      throw err;
    }
    next();
  }
}

async function CheckUserExists(email) {
  const userExists = await GetUserInfoByEmail(email);

  if (!userExists) {
    return false;
  }
  return true;
}

export { sendPasswordResetLink }
