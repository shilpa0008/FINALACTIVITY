
const express = require('express');
const bodyParser = require('body-parser'); //Body Parser is an npm package that is used to parse the incoming request bodies in a middleware.
const userDetail = require('./routes/userDetail.route'); // Imports routes for the products
const app = express();
const session = require('express-session');
/*Code for valdiation email password etc. starts  here*/
const expressValidator = require('express-validator');
app.use(expressValidator());
/*Code for valdiation email password etc. ends  here*/
//npm install cors
//npm install nodemon // to auto restart
var cors = require('cors');
//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
//ends enable cors
// Set up mongoose connection
 const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://userDetail:test123@cluster0-3meur.mongodb.net/userDetail?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', userDetail);
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
let port = 8000;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});