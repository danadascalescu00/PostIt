
const express = require('express')
const passport = require('passport')

const request = require('request')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

multiPassport = new passport.Passport()
// facebookPassport = new passport.Passport()


var db = require('./db');

const FACEBOOK_APP_ID = ''
const FACEBOOK_APP_SECRET = ''

postMessageOnPage = (pageId, pageAccessToken, message) => {
  postURL = `https://graph.facebook.com/` +
    `${pageId}/feed?` +
    `message=${message}&` +
    `access_token=${pageAccessToken}`

  request.post(postURL, (error, res, body) => {
    try {
      console.log(body)
    } catch (e) {
        console.error("Failed to post on FACEBOOK")
        console.error(error)
      }
  })
}

exchangeForPageAccessToken = (pageId, userAccessToken) => {
  pageAccessTokenURL = `https://graph.facebook.com/` +
    `${pageId}?access_token=${userAccessToken}&fields=access_token`

  request.get(pageAccessTokenURL, (error, res, body) => {
      try {
        postMessageOnPage(
          pageId, 
          JSON.parse(body).access_token, 
          "Message posted using my own js library")
      } catch (e) {
        console.error("Failed to get PAGE ACCESS TOKEN")
        console.error(error)
      }
  })
}

exchangeForLongLivedAccessToken = (shortLivedUserAccessToken) => {
  longLivedAccessTokenURL = `https://graph.facebook.com/oauth/` +
    `access_token?grant_type=fb_exchange_token&` +
    `client_id=${FACEBOOK_APP_ID}&` +
    `client_secret=${FACEBOOK_APP_SECRET}&` + 
    `fb_exchange_token=${shortLivedUserAccessToken}`

  console.log(longLivedAccessTokenURL)
    request.get(longLivedAccessTokenURL, (error, res, body) => {
      try {              
        exchangeForPageAccessToken('190308577733420', JSON.parse(body).access_token)
      } catch (e) {
        console.error("Failed to get LONG_LIVED USER ACCESS TOKEN")
        console.error(error)
      }
  })
}

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
multiPassport.use(new LocalStrategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

multiPassport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: '/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(`Got my ${accessToken}`)
    console.log(`PROFILING ${JSON.stringify(profile)}`)
    db.users.findByIdAndUsername(profile.id, profile.displayName, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      return cb(null, user);
    });

    try {
      console.log(accessToken)
      // exchangeForLongLivedAccessToken(accessToken)
    } catch (e) {
      console.log("Failed when requesting the LONG_LIVED USER ACCESS TOKEN")
      console.error(e)
    } finally {
      return cb(null, profile);
    }

}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
multiPassport.serializeUser(function(user, cb) {
  console.log(`serializing from local: ${JSON.stringify(user)}`)
  cb(null, user);
});

multiPassport.deserializeUser(function(user, cb) {
  console.log(`deserializing from local: ${user.id} and ${user.displayName}`)
  usernameToCall = user.username
  if (usernameToCall == undefined || usernameToCall == null) {
    usernameToCall = user.displayName
  }
  db.users.findByIdAndUsername(user.id, usernameToCall, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// facebookPassport.serializeUser(function(user, cb) {
//   console.log(`serializing from facebook: ${JSON.stringify(user)}`)
//   cb(null, user.username);
// });

// facebookPassport.deserializeUser(function(obj, cb) {
//   console.log(`deserializing from facebook: ${JSON.stringify(obj)}`)
//   db.users.findByIdAndUsername(obj, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, obj);
//   });
// });




// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.



// app.use(facebookPassport.initialize())
app.use(multiPassport.initialize())

app.use(multiPassport.session())

// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });
  
app.post('/login', 
  multiPassport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { 
      user: req.user,
      facebook_user: req.facebook_user });
  });

// facebook service
app.get('/login/facebook',
  multiPassport.authenticate('facebook', {
    scope: ["manage_pages", "public_profile", "read_insights", "pages_show_list", "publish_pages"]
  }));

app.get('/return', 
  multiPassport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
  

app.listen(process.env['PORT'] || 3000);
