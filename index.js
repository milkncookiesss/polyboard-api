import app from './server/index.js';

console.log('idk if this is where it is breaking?');
import db from './server/DataLayer/models/index.js';

const port = process.env.PORT || 8000;

db.sequelize
  .authenticate()
  .then(async () => {
    console.log("connection to db is good");
  })
  .catch((err) => {
    console.error("could not connect to db ", err);
  })
app.listen(port, () => console.log('listening on port ', port));
