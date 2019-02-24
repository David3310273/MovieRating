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
    update: (conditions, item) => {
        return Movie.findOne(conditions).exec().then((movie) => {
            console.log(item)
            if (movie) {
                movie.rate = parseInt(item.rate)
                return movie.save()
            } else {
                return new Promise((resolve, reject) => {
                    reject("No record found!")
                })
            }
        })
    },

    list: (conditions, columns, limit) => {
        if (conditions._id) {
            if (typeof conditions._id == "string") {
                return Movie.findOne(conditions).limit(limit).select(columns).exec();
            } else {
                return Movie.find(conditions).limit(limit).select(columns).exec();
            }
        } else if (conditions.genres) {
            delete conditions._id
            conditions.genres = {
                '$regex': conditions.genres
            }
        }
        
        if (conditions.name) {
            conditions.name = {
                '$regex': conditions.name,
                '$options': 'i'
            }
        }
        console.log(conditions)
        return Movie.find(conditions).limit(limit).select(columns).exec();
    }
}

module.exports.model = Movie;
module.exports.utils = utils;
