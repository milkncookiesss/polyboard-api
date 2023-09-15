import db from '../../models/index.js';
import { uuid } from 'uuidv4';

const Send = db.Send;
const Sequelize = db.Sequelize;

// -------------------------------------------------------------------------- //
/**
*/
async function CreateSend(userId, problemId, note, rating, grade) {
  const sendId = uuid();
  const send = {
    id: sendId,
    userId,
    problemId,
    rating,
    grade,
    note
  };
  try {
    return await Send.create(send);
  } catch(err) {
    console.error(err);
    throw err;
  }
}

export { CreateSend };
