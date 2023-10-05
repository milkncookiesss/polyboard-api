import nodemailer from 'nodemailer';
import { GetUserInfoByEmail } from '../../DataLayer/Services/users/GetUserInfo.js';
import { CreatePasswordResetCodeRecord } from '../../DataLayer/Services/users/ResetPassword.js';
const hostEmail = process.env.HOST_EMAIL;
const emailPassword = process.env.HOST_EMAIL_PASSWORD;
const emailPort = process.env.GMAIL_PORT;
const emailHost = process.env.SMTP_HOST;

function sendPasswordResetLink() {
  return async (req, res, next) => {
    const { userEmail } = req.body;
    const userExists = await CheckUserExists(userEmail);
    const passwordResetCode = PasswordResetCodeGenerator();

    if (!userExists) {
      res.status(404).send({ statusCode: 404, message: "user does not exist" });
      return next();
    }
    try {
      await CreatePasswordResetCodeRecord(userEmail, passwordResetCode);
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
        <br>Enter this code in the app to be able to reset your password: <b>${passwordResetCode}</b></br>`,
        html: `
        <b>Hello this is an automated email to reset your password.</b>
        <br>Enter this passwordResetCode in the app to be able to reset your password: <b>${passwordResetCode}</b></br>`,
      };
  
      const info = await transporter.sendMail(mailData);
      res.status(200).send(true);
      next();
    } catch (err) {
      console.log('Error in ResetPassword ', err);
      res.status(500).send(false);
      next();
    }
  }
}

async function CheckUserExists(email) {
  const userExists = await GetUserInfoByEmail(email);

  if (!userExists) {
    return false;
  }
  return true;
}

function PasswordResetCodeGenerator() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';
  const length = 8;

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }

  return code;
}

export { sendPasswordResetLink }
