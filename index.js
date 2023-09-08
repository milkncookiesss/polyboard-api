import app from './server/index.js';
import db from './server/DataLayer/models/index.js';

const port = process.env.PORT || 8000;

db.sequelize
  .authenticate()
  .then(async () => {
    console.log("connection to db is good");
  })
  .catch((err) => {
    console.error("ERROR: Could not connect to database.\n ERROR: %o", err);
  })
app.listen(port, () => console.log('listening on port ', port));
