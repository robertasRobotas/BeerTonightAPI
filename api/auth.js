const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {


    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, 'password', function (err, decoded) {
        if (err) {
            res.status(400).json({
                message: "login again! // token expired"
            })
        } else {
            req.body.userID = decoded.userId;
            return next();
        }
    });


};

