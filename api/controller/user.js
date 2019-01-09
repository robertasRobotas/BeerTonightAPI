const mongoose = require('mongoose');
const UserSchema = require('../modles/user');
const bcrypt = require('bcryptjs');
const User = require('../modles/user');
const jwt = require('jsonwebtoken');

module.exports.NEW_USER = (req, res, next) => {

    if ((req.body.password) === 0 || (req.body.email === 0) || req.body.name === 0) {

        res.status(400).json({
            message: "Error saving user"
        });

    } else {


        const password = req.body.password;


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

    }

};


module.exports.LOGIN = (req, res, next) => {


    if (req.body.email.length === 0 || req.body.password.length === 0) {

        res.status(401).json({
            message: "Bad password or email",
        });

    } else {

        User.findOne({email: req.body.email})
            .then(user => {

                console.log(user);

                bcrypt.compare(req.body.password, user.password).then((succ) => {

                    if (succ) {

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


                        res.status(200).json({
                            token: token
                        });


                    } else {

                        res.status(401).json({
                            message: "Bad password or email",
                        });
                    }


                });


            })
            .catch(err => {
                res.status(401).json({
                    message: "Bad password or email",
                    err: err
                });
            });

    }

};




module.exports.AUTH_GOOGLE = (req, res, next) => {


};
