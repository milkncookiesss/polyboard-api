import app from './server/index.js';
import db from './server/DataLayer/index.js';

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('listening on port ', port));
