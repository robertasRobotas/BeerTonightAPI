const express = require('express');
const router = express.Router();


const UserController = require('../controller/user');

router.post('/newUser', UserController.NEW_USER);

router.post('/login', UserController.LOGIN);



module.exports = router;