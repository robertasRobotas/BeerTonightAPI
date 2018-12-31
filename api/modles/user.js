const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    password: {type: String, required: true},
    beerTonight : {type : Boolean, default : false},
    friends : {type : Array}
});

module.exports = mongoose.model('User', userSchema);