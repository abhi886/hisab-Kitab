// Changed on jan 5
const express = require('express');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');
const config = require('config');
const users = require('../routes/users');
const auth = require('../routes/auth.js');
const groups = require('../routes/groups.js');
const tests = require('../routes/tests.js');
const genres = require('../routes/genres');

const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: JWT not defined');
  process.exit(1);
}
// Connect to MongoDB. This is just a test.
// Would be removed after the real connection to the mongodb.changes
mongoose
  .connect('mongodb://localhost/test', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log('error found');
    console.log(err);
  });
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/groups', groups);
app.use('/api/tests', tests);
app.use('/api/genres', genres);
app.use(fileupload());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post('/upload', async (req, res) => {
  console.log(req.files);
});

const port = process.env.PORT || 3000;
const server = app.listen(3000, () => console.log(`Listening to port ${port}`));
module.exports = server;
