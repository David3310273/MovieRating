var express = require('express');
var genres = require('../models/genres');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Welcome to movie rates' });
});

module.exports = router;
