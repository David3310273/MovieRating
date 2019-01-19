var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.userId) {
        res.render('main', {
            name: req.session.name,
            id: req.session.id,
            img: req.session.img || ''
        })
    } else {
        res.render('main', {
            id: undefined
        });
    }
});

module.exports = router;
