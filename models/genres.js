var mongoose = require('mongoose');
var redis = require('redis').createClient();

var genresSchema = new mongoose.Schema({
    id: {type: Number, required: true, index: {unique: true}},
    name: {type: String, default: ''},
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now}
});

var genres = mongoose.model('genres', genresSchema);
var utils = {
    list: function(conditions, columns) {
        var conditions = conditions || {};
        var columns = columns || {};     
        if (conditions._id) {
            return genres.findOne(conditions).select(columns).exec();
        } else {
            return genres.find(conditions).select(columns).exec();
        }
    }
}

module.exports.model = genres;
module.exports.utils = utils;
