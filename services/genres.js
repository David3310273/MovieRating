var express = require('express');
var genres = require('../models/genres');
var errorCode = require('../config/errorCode')
var router = express.Router();

router.get(['/list', '/list/:id'], (req, res, next) => {
  var result = {}
  var id = req.params.id || undefined;
  var columns = {};
  var conditions = {};

  if (id) {
    conditions.id = parseInt(id);
  }

  genres.utils.list(conditions, columns).then((data) => {
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