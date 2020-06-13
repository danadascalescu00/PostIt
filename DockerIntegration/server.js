const Cors = require('cors')
const express = require('express')
const https = require('https');
const fs = require('fs');
const path = require('path');


multiPassport = new (require('passport')).Passport()
require('./config/passport')(multiPassport)

const app = express()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

const whitelist = [
  'http://20.188.32.238:3031',
  'http://20.188.32.238:3000',
  'http://20.188.32.238:3003',
  'capacitor://20.188.32.238',
  'ionic://20.188.32.238',
  'http://20.188.32.238',
]

const corsOptions = {
  origin: (origin, callback) => {
    // console.log(origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
      // callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'authorization'],
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
  preflightContinue: true
  // optionsSuccessStatus: 200,
};

app.use(Cors(corsOptions));
app.use(require('morgan')('combined'))
app.use(require('body-parser').json())//urlencoded({ extended: true }))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ 
  resave: false, 
  saveUninitialized: false,
  secret: 'mydirtylittlesecret', 
}))

app.use(express.static(path.join(__dirname, 'build')));

app.use(multiPassport.initialize())
app.use(multiPassport.session())

// Connect to MongoDB
require('./config/mongoAdapter')()

// Define routes.
// require('./routes.js')(app, multiPassport)
require('./routesAPI.js')(app, multiPassport)



var options = {

  key: fs.readFileSync('./server.key'),
 
  cert: fs.readFileSync('./nume.crt'),
 
  ca: fs.readFileSync ('./nume.ca-bundle')
 
 };
 
 https.createServer(options, app).listen(443);
 
// app.listen(3000);
