const passport = require('passport');
const googleStategie = require('passport-google-oauth20');
const keys = require('../keys');


passport.use(new googleStategie({

    callbackURL : '/user/authGoogle',
    clientID : keys.google.clientID,
    clientSecret : keys.google.clientSecret

} ,()=>{

    }));