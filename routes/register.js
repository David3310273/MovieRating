var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {
    title: 'Welcome to movie rates',
    layout: "register" 
  });
});

module.exports = router;
