var express = require('express');
var router = express.Router();
var errorCode = require('../config/errorCode');
var genres = require('../models/genres');
var movies = require('../models/movie');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

// Search movie by name
router.get("/movie/search", (req, res, next) => {
    var name = req.query.q || "";
    var columns = {};
    var conditions = {};
    var limit = req.query.limit || 32

    if (name) {
        conditions.name = name;
    }

    movies.utils.list(conditions, columns, limit).then((data) => {
        res.render("search", {
            q: name,
            movies: data
        });
    }).catch((err) => {
        result = {}
        if (err) {
            result.code = errorCode.ERROR.code;
            result.msg = errorCode.ERROR.msg;
            result.data = err;
        }
        res.send(result);
    });
});

/* GET movie details*/
router.get("/movie/:id", (req, res, next) => {
    var id = req.params.id || undefined;
    var columns = {};
    var conditions = {};
    var limit = 1;
    var isLogin = req.session || undefined

    if (id) {
        conditions._id = id;
    }

    movies.utils.list(conditions, columns, limit).then((data) => {
        res.render("movie", {
            name: data.name,
            rate: data.rate,
            _id: data._id,
            genres: data.genres,
            isLogin: isLogin
        });
    }).catch((err) => {
        result = {}
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
        var genresId = req.params.id || "";
        res.render('genres', {
            name: data.name,
            genresId: genresId
        })
    }).catch((err) => {
        console.log(err)
    })
});

module.exports = router;
