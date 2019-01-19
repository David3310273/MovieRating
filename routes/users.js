var express = require('express');
var router = express.Router();
var user = require('../models/user');
var errorCode = require('../config/errorCode')
var crypto = require('crypto')

/* user registering. */
router.post('/register', (req, res, next) => {
    result = {}
    user.utils.add(req.body).then((data) => {
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

/* user logout*/
router.post('/logout', (req, res, next) => {
    result = {}
    req.session.destroy((err) => {
        if (err) {
            result.code = errorCode.ERROR.code;
            result.msg = errorCode.ERROR.msg;
            result.data = err; 
        } else {
            result.code = errorCode.SUCCESS.code;
            result.msg = errorCode.SUCCESS.msg;
            result.data = {};
        }
        res.send(result)
    })
})

/* user login*/
router.post('/login', (req, res, next) => {
    result = {}
    md5 = crypto.createHash('md5')
    // console.log(md5.update(req.body.password).digest('hex'))
    query = {
        name: req.body.name,
        password: md5.update(req.body.password).digest('hex'),
        email: req.body.email
    }
    user.utils.list(query).then((data) => {
        userItem = data[0] || data[1]
        if (userItem) {
            //write session if user agrees
            if (req.body.remember) {
                req.session.userId = userItem._id
                req.session.name = userItem.name
                req.session.img = userItem.img || ""
                console.log(req.session)
            }
            result.code = errorCode.SUCCESS.code;
            result.msg = errorCode.SUCCESS.msg;
            result.data = userItem;
            res.send(result);
        } else {
            return Promise.reject("the user doesn't exist!")
        }
    }).catch((err) => {
        result.code = errorCode.ERROR.code;
        result.msg = errorCode.ERROR.msg;
        result.data = err;
        res.send(result);
    });
});

module.exports = router;
