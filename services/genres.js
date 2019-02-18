var express = require('express');
var genres = require('../models/genres');
var errorCode = require('../config/errorCode')
var redis = require('redis').createClient();
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
    return Promise.resolve(data);
  }).then((data) => {
    finalData = []
    // accessing redis to get recommended order
    redis.zrevrange("genres", 0, -1, function(err, keys) {
        for (var i in keys) {
          for (var j = 0; j < data.length; j++) {
             if (data[j]._id == keys[i]) {
                finalData.push(data[j])
                break
             }
          }
        }
        result.code = errorCode.SUCCESS.code;
        result.msg = errorCode.SUCCESS.msg;
        result.data = finalData;
        res.send(result);
    })
  }).catch((err) => {
    if (err) {
        result.code = errorCode.ERROR.code;
        result.msg = errorCode.ERROR.msg;
        result.data = err;
    }
  });
});

module.exports = router;