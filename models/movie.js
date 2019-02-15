var mongoose = require('mongoose')
var crypto = require('crypto');

var movieSchema = new mongoose.Schema({
    name: String,
    id: {type: Number, required: true},
    genres: String,
    rate: {type: Number, default: 0},
    introduction: {type: String, default: ""},
    isValid: {type: Number, default: 1}
});

var Movie = mongoose.model('movie', movieSchema);
var utils = {
    list: (conditions, columns, limit) => {
        if (conditions._id) {
            return Movie.findOne(conditions).limit(limit).select(columns).exec();
        } else if (conditions.genres) {
            conditions.genres = {
                $regex: conditions.genres
            }
        }
        
        return Movie.find(conditions).limit(limit).select(columns).exec();
    }
}

module.exports.model = Movie;
module.exports.utils = utils;
