var express = require('express');
var behaviors = require("../models/behaviors");
var errorCode = require('../config/errorCode')
var log4js = require('log4js')
var router = express.Router();

//collecting genres info when user click one of the genres
router.post('/genres', (req, res, next) => {
  var userId = req.session.userId || -1;
  var genresId = req.body.genresId || -1;
  var timestamp = Date.now();
  var result = {}

  behaviors.genres([userId, genresId, timestamp].join(','))

  result.code = errorCode.SUCCESS.code;
  result.msg = errorCode.SUCCESS.msg;
  res.send(result)
});

//collecting movies info when user click one of the movies
router.post('/movies', (req, res, next) => {
  var userId = req.session.userId || -1;
  var movieId = req.body.movieId || -1;
  var timestamp = Date.now();
  var result = {}
  behaviors.movies([userId, movieId, timestamp].join(','))

  result.code = errorCode.SUCCESS.code;
  result.msg = errorCode.SUCCESS.msg;
  res.send(result)
});

//collecting info when user ratings one of the movies
router.post('/ratings', (req, res, next) => {
  var userId = req.session.userId || -1;
  var movieId = req.body.movieId || -1;
  var rate = req.body.rate || 0;
  var timestamp = parseInt(Date.now()/1000);
  var result = {}
  behaviors.ratings([userId, movieId, rate, timestamp].join(','));

  result.code = errorCode.SUCCESS.code;
  result.msg = errorCode.SUCCESS.msg;
  res.send(result)
});

module.exports = router;