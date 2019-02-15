var express = require('express');
var movie = require('../models/movie');
var errorCode = require('../config/errorCode')
var router = express.Router();

router.post(['/list', '/list/:id'], (req, res, next) => {
  var result = {}
  var id = req.params.id || undefined;
  var columns = {};
  var conditions = {};
  var limit = req.body.limit || 8;

  if (id) {
    conditions.id = parseInt(id);
  }

  movie.utils.list(conditions, columns, limit).then((data) => {
    result.code = errorCode.SUCCESS.code;
    result.msg = errorCode.SUCCESS.msg;
    result.data = data;
    res.send(result);
  }).catch((err) => {
    if (err) {
        result.code = errorCode.ERROR.code;
        result.msg = errorCode.ERROR.msg;
        result.data = err;
    }
    res.send(result);
  });
});

router.post("/listByGenres", (req, res, next) => {
  var result = {}
  var genresId = req.body.genres || "";
  var columns = {};
  var conditions = {};
  var limit = req.body.limit || 8;

  conditions._id = genresId;

  genres.utils.list(conditions, columns, limit).then((data) => {
    conditions._id = undefined
    conditions.genres = data.name
    return Promise.resolve(conditions)
  }).then((conditions) => {
    return movie.utils.list(conditions, columns, limit)
  }).then((data) => {
    result.code = errorCode.SUCCESS.code;
    result.msg = errorCode.SUCCESS.msg;
    result.data = data;
    res.send(result);
  }).catch((err) => {
    if (err) {
        result.code = errorCode.ERROR.code;
        result.msg = errorCode.ERROR.msg;
        result.data = err;
    }
    res.send(result);
  });
});

module.exports = router;