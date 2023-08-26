import app from './server/index.js';
import db from './server/dataLayer/index.js';

const port = process.env.PORT || 8000;

app.listen(port, () => console.log('listening on port ', port));
