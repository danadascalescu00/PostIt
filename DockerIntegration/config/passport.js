const FACEBOOK_APP_ID = '614936155905378'
const FACEBOOK_APP_SECRET = '0acfc566eacc72b4d28ae5c6340a079a'

const REDDIT_APP_ID = '0ojMzPpxLoCkSA'
const REDDIT_APP_SECRET = 'Su6skWQoqGy4k3a-S9bh93LXR_w'

const TWITTER_APP_ID = 'my7Xr8xjZ1gJHUZWqganSOAw7';
const TWITTER_APP_SECRET = 'KnRgGcD4SM3J8MhwfYcW4aRPGwNFNPd47jUxa1MSwJktLGhdcs';

const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const LocalStrategy = require('passport-local').Strategy
const RedditStrategy = require('passport-reddit').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const jwtSecret = require('./jwtConfig')
const User = require('../models/User')

const facebookPost = require('../facebookPost/postOnFacebook')

module.exports = function(multiPassport) {

    multiPassport.serializeUser(function(user, cb) {
        console.log("serialize")
        cb(null, user.id)
    });
      
    multiPassport.deserializeUser(function(id, cb) {
        console.log("deserialize")
        User.findById(id, function(err, user) {
            cb(err, user)
        })
    });



    multiPassport.use('local-login', new LocalStrategy({
        passReqToCallback : true,
        session: false
    },
    function(req, _username, _password, cb) {
        if (_username)
            _username = _username.toLowerCase()
        
        process.nextTick(function() {
            User.findOne({username: _username}, function(err, user) {
                if (err) 
                    return cb(err)

                if (!user) 
                    return cb(null, false, req.flash('loginMessage', 'No user found.')); 
                
                if (!user.validPassword(_password)) 
                    return cb(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                
                return cb(null, user);
            });
        })
    }));

    multiPassport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback : true,
        session: false
    },
    function(req, _username, _password, cb) {
        console.log("local-signup")
        if (_username)
            _username = _username.toLowerCase()
        console.log(_username, _password)
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({username: _username}, (error, result) => {
                    if (error) {
                        console.log('An error occured when checking if the username already exists')
                        return cb(error)
                    }
                    if (result) {
                        return cb(null, false, req.flash('signupMessage', 'That email is already taken.'))
                    } else {
                        // can add a new user to database
                        newUser = new User;
                        newUser.username = _username,
                        newUser.password = newUser.generateHash(_password)
                        newUser.save((error) => {
                            if (error) {
                                console.log(`Failed to add the new user to database: ${newUserData}`)
                                return cb(error)
                            }
                            return cb(null, newUser)
                        })
                    }
                })
            // if the user is logged in but has no local account...
            } else if (!req.user.username) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({username: _username}, (error, result) => {
                    if (error) {
                        console.log('An error occured when checking if the username already exists')
                        return cb(error)
                    }
                    if (result) {
                        return cb(null, false, req.flash('loginMessage', 'That email is already taken.'))
                    } else {
                        
                        newUser = req.user;
                        newUser.username = _username,
                        newUser.password = newUser.generateHash(_password)
                        newUser.save((error) => {
                            if (error) {
                                console.log(`Failed to add the new user to database: ${newUserData}`)
                                return cb(error)
                            }
                            return cb(null, newUser)
                        })
                    }
                })
            } else {
                return cb(null, req.user)
            }
        })
    }));
    
    multiPassport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: '/return/facebook',
        passReqToCallback : true 
    },
    function(req, accessToken, refreshToken, profile, cb) {
        const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user
        facebookPost.getAllPages(profile.id, accessToken, (pages) => {
            // console.log(pages)
            User.findByIdAndUpdate({_id: userId}, {
                facebookId: profile.id,
                facebookToken: accessToken,
                facebookUsername: profile.displayName, 
                facebookPagesList: pages
                // TODO: don't forget to add expiration date for token
            },
            { useFindAndModify: false },
            (error, result) => {
                return cb(error, result)
            })
        })  
    }));

    multiPassport.use(new TwitterStrategy({
        consumerKey: TWITTER_APP_ID,
        consumerSecret: TWITTER_APP_SECRET,
        callbackURL: 'http://localhost/return/twitter',
        passReqToCallback: true
    },
    function (req, token, tokenSecret, profile, cb) {
        console.log(token);
        console.log("______ AM PRIMIT ______");
        console.log(tokenSecret)
        console.log(req)
        console.log('*********************************************')
        const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user;
        User.findByIdAndUpdate({_id: userId}, {
            twitterId: profile.id,
            twitterToken: token,
            twitterTokenSecret: tokenSecret,
            twitterUsername: profile.username, 
            // TODO: don't forget to add expiration date for token
        },
        { useFindAndModify: false },
        (error, result) => {
            return cb(error, result)
        })
    }));

    multiPassport.use(new RedditStrategy({
        clientID: REDDIT_APP_ID,
        clientSecret: REDDIT_APP_SECRET,
        callbackURL: 'http://127.0.0.1:80/return/reddit',
        passReqToCallback : true
      },
      function(req, accessToken, refreshToken, profile, cb) {
        console.log("Tokens:")
        console.log(accessToken)
        console.log(refreshToken)
        const userId = JSON.parse(Object.values(req.sessionStore.sessions)[0]).passport.user
        User.findByIdAndUpdate({_id: userId}, {
            redditId: profile.id,
            redditToken: accessToken,
            redditUsername: profile.name, 
            // TODO: don't forget to add expiration date for token
        },
        { useFindAndModify: false },
        (error, result) => {
            return cb(error, result)
        })
      }
    ));

    const opts = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: jwtSecret.secret,
    };

    multiPassport.use(
        'jwt',
        new JWTstrategy(opts, (jwt_payload, done) => {
            console.log("IN PASSPORT")
            console.log(jwt_payload.id)
          try {
            User.findOne({
                _id: jwt_payload.id,
            }).then(user => {
              if (user) {
                console.log('user found in db in passport');
                done(null, user);
              } else {
                console.log('user not found in db');
                done(null, false);
              }
            });
          } catch (err) {
            done(err);
          }
        }),
      );
}

// https://not-an-aardvark.github.io/reddit-oauth-helper/