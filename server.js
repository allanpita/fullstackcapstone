const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const { DATABASE_URL, PORT } = require('./mongoconfig');

//mongoose promise connection (for testing locally)
/*
const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/student')
  .then(() =>  console.log('connected to mongo succesfully'))
  .catch((err) => console.error(err));
*/
//Morgan Loger
app.use(morgan("common"));
app.use('/', require('./routes/routes'))

//app.use(express.static('public'));


//start server / connections
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      console.log(`mongoDB is located at: ${databaseUrl}`);
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };