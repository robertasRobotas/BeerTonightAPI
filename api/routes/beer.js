const express = require('express');
const router = express.Router();

const User = require('../modles/user');
const verifyUser = require('../auth');

const BeerController = require('../controller/beer');


router.get('/getBeerStatus', verifyUser, BeerController.GET_BEER_STATUS);

router.get('/changeBeerStatus', verifyUser, BeerController.CHANGE_BEER_STATUS);

router.get('/getAllUsers', BeerController.GET_ALL_USERS);

/*
app.get('/GetAllUsersWhoBeer',(req,res)=>{

});

app.patch('/changeBeerStatus',(req,res)=>{

});
*/


module.exports = router;