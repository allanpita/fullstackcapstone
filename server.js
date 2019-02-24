const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//mongoose promise connection
const mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/student')
  .then(() =>  console.log('connected to mongo succesfully'))
  .catch((err) => console.error(err));

//Morgan Loger
app.use(morgan("common"));
app.use('/', require('./routes/routes'))

//app.use(express.static('public'));


//start server / connections
let server;

function startServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    })
    .on('error', err => {
      reject(err);
    });
  });
}
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log("Closing server");
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {startServer().catch(err => console.error(err));};

module.exports = {app, startServer, closeServer};