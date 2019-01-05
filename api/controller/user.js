const mongoose = require('mongoose');
const UserSchema = require('../modles/user');
const bcrypt = require('bcryptjs');
const User = require('../modles/user');
const jwt = require('jsonwebtoken');

module.exports.NEW_USER = (req, res, next) => {


    const password = req.body.password;

console.log(req.body.name);
console.log(req.body.email);
console.log(req.body.password);


    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {

            if (hash) {

                const user = new UserSchema({
                    id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });


                user.save().then(
                     res.status(201).json({
                        message: "New user saved"
                    })
                ).catch(err => {
                    res.status(400).json({
                        message: "Error saving user"
                    });
                });
            }
        });
    });
};



module.exports.LOGIN = (req, res, next) => {

    User.findOne({email : req.body.email})
        .then(user=>{


            bcrypt.compare(req.body.password, user.password).then((succ) => {

            if(!succ){
                res.status(500).json({
                    message : "bad email or name",
                });
            }
            else{

                const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                    'password',
                    {
                        expiresIn: '1h'
                    },
                    {
                        algorithm: 'RS256'
                    });

                console.log(token);

            }

                res.status(200).json({
                    token : token
                });
            });




        })
        .catch(err=>{
            res.status(500).json({
                message : "error",
                err : err
            });
        });

};