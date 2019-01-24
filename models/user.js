var mongoose = require('mongoose')
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, index: {unique: true}},
    password: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
});

var User = mongoose.model('user', userSchema);
var utils = {
    add: (items) => {
        md5 = crypto.createHash('md5');
        var newUser = new User({
            name: items.name,
            email: items.email,
            password: md5.update(items.password).digest('hex')
        });
        
        return newUser.save();
    },

    list: (user, column) => {
        loginWithName = {
            name: user.name
        }

        loginWithEmail = {
            email: user.email
        }

        return Promise.all([User.findOne(loginWithName).exec(), User.findOne(loginWithEmail).exec()]) 
    }
}

module.exports.model = User;
module.exports.utils = utils;
