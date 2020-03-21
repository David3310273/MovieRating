var mongoose = require('mongoose')

var rateSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    movieId: {type: String, required: true},
    rate: {type: Number, default: 0.0},
    create_time: {type: Date, default: parseInt(Date.now()/1000)}
});

var Rate = mongoose.model('rate', rateSchema);
var utils = {
    insert: (item) => {
        var rateItem = new Rate({
            userId: item.userId,
            movieId: item.movieId,
            rate: item.rate
        })

        return rateItem.save();
    }
}

module.exports.model = Rate;
module.exports.utils = utils;
