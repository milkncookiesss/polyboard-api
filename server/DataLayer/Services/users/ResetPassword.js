import db from '../../models/index.js';

const Passwordresetcode = db.Passwordresetcode;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function CreatePasswordResetCodeRecord(email, code) {
  try {
    const resetRecord = await Passwordresetcode.findOne({ where: { email }});
    if (resetRecord) {
      await Passwordresetcode.update( { code }, { where: { email }});
    } else {
      await Passwordresetcode.create( { email, code });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function DeletePasswordResetCodeRecords(email) {
  try {
    await Passwordresetcode.destroy({ where: { email }});
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export { CreatePasswordResetCodeRecord, DeletePasswordResetCodeRecords };
