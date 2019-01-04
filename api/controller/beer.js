const User = require('../modles/user');


module.exports.GET_BEER_STATUS = (req, res) => {

    User.findOne({_id: req.body.userID})
        .then(user => {
            res.status(200).json({
                beerStatus: user.beerTonight
            });
        })
};




module.exports.CHANGE_BEER_STATUS = (req, res) => {

    User.findOne({_id: req.body.userID})
    .then(user=>{

User.updateOne(
        {
            _id: req.body.userID
        },
        {
            beerTonight: !user.beerTonight
        })
        .then(user => {


            res.status(200).json({
                message: "statusChanged"
            });

        });


    });

    


    setTimeout(() => {


        User.updateOne(
            {
                _id: req.body.userID
            },
            {
                beerTonight: false
            }).then(res.status(200))


    }, 30000000);


};


module.exports.GET_ALL_USERS = (req, res) => {
    User.find()
        .then(response => {

            res.status(200).json({
                message: "all users",
                users: response
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "error retriving all users",
                err: err
            })
        });
};