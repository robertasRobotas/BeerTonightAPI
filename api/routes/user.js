const express = require('express');
const router = express.Router();
const passport = require('passport');


const UserController = require('../controller/user');

router.post('/newUser', UserController.NEW_USER);

router.post('/login', UserController.LOGIN);

router.get('/loginGoogle', passport.authenticate('google', {
    scope : ['profile']
}));

router.get('/authGoogle', UserController.AUTH_GOOGLE);


module.exports = router;