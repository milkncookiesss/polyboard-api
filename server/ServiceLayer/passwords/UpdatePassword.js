import { UpdatePassword, DeleteUserPasswordResetCodeRecords, ResetCodeExistsForUser } from '../../DataLayer/Services/users/UpdatePassword.js';
import bcrypt from 'bcrypt';

function updatePassword() {
  return async (req, res, next) => {
    const { userEmail, password, code } = req.body;
    const hashedPassword = await createPasswordHash(password);
    const resetCodeExists = await ValidateResetCodeExistsForUser(userEmail, code);

    if (!resetCodeExists) {
      res.status(404).send({ message: 'user provided incorrect code' });
      return next();
    }

    try {
      await Promise.all(
        [
          await UpdatePassword(userEmail, hashedPassword), 
          await DeleteUserPasswordResetCodeRecords(userEmail)
        ]
      );
      
      res.status(200).send({ message: 'password updated' });
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'could not update password' });
      next();
      throw err;
    }
  }
}

// -------------------------------------------------------------------------- //
/**
 * create hashed password
*/
async function createPasswordHash(password) {
  const salt = await bcrypt.genSalt(10);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch(err) {
    console.error(err);
    throw err;
  }
}

async function ValidateResetCodeExistsForUser(email, code) {
  const userCodeExists = await ResetCodeExistsForUser(email, code);
  let codeExists = false;
  if (userCodeExists) {
    codeExists = true;
  }
  return codeExists;
}

export { updatePassword };
