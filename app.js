const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passportSetup = require('./api/middleware/passport');

const app = express();

const userRoute = require('./api/routes/user');
const beerRoute = require('./api/routes/beer');

mongoose.connect('mongodb://robertasRobot:robertasRobot1@ds133476.mlab.com:33476/who_beer',
    { useNewUrlParser: true })
    .then(console.log('connected'))
    .catch(err=>{
        console.log('xxxxxxxxxxxxxxxxxx');
        console.log(err);
    });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/user',userRoute );
app.use('/beer',beerRoute );



module.exports = app;