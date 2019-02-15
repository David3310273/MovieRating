var express = require('express');
var router = express.Router();
var genres = require('../models/genres');
var movies = require('../models/movie');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET movie details*/
router.get("/movie/:id", (req, res, next) => {
    var id = req.params.id || undefined;
    var columns = {};
    var conditions = {};
    var limit = 1;

    if (id) {
        conditions._id = id;
    }

    movies.utils.list(conditions, columns, limit).then((data) => {
        res.render("movie", {
            name: data.name,
            rate: data.rate
        });
    }).catch((err) => {
        if (err) {
            result.code = errorCode.ERROR.code;
            result.msg = errorCode.ERROR.msg;
            result.data = err;
        }
        res.send(result);
    });
});

/* GET movie list by genres*/
router.get("/genre/:id", (req, res, next) => {
    genres.utils.list({_id: req.params.id}).then((data) => {
        return Promise.resolve(data)
    }).then((data) => {
        var result = {}
        var genresId = req.body.genres || "";
        var columns = {};
        var conditions = {};
        var limit = req.body.limit || 32;

        conditions.genres = data.name;

        movies.utils.list(conditions, columns, limit).then((movies) => {
            console.log(movies)
            res.render('genres', {
                name: data.name,
                movies: movies
            })
        })
    }).catch((err) => {
        console.log(err)
    })
});

module.exports = router;
