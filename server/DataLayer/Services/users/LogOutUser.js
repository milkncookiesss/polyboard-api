import db from '../../models/index.js';

const User = db.User;
const Sequelize = db.Sequelize;

async function UpdateUserTokenAtLogOut(id) {
  return await User.update(
    { 
      userToken: null 
    }, 
    {
      where: { 
        id
      } 
    }
  )
  .then(res => res)
  .catch((err) => {
    console.error(err);
    throw new Error(err);
  });
}

export { UpdateUserTokenAtLogOut };
