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

/* user info */

router.post('/info', (req, res, next) => {
    result = {}
    result.code = errorCode.SUCCESS.code;
    result.msg = errorCode.SUCCESS.msg;
    result.data = req.session;
    res.send(result)
});

/* user logout*/
router.post('/logout', (req, res, next) => {
    result = {};
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
    password = md5.update(req.body.password).digest('hex')
    // console.log(md5.update(req.body.password).digest('hex'))
    query = {
        name: req.body.name,
        email: req.body.email
    }
    user.utils.list(query).then((data) => {
        userItem = data[0] || data[1]
        if (userItem) {
            if (userItem.password != password) {
                return Promise.reject("Wrong password, please check.")
            }
            //write session when user login succeed
            req.session.userId = userItem._id
            req.session.name = userItem.name
            req.session.img = userItem.img || ""

            result.code = errorCode.SUCCESS.code;
            result.msg = errorCode.SUCCESS.msg;
            result.data = userItem;
            res.send(result);
        } else {
            return Promise.reject("The user doesn't exist!")
        }
    }).catch((err) => {
        result.code = errorCode.ERROR.code;
        result.msg = errorCode.ERROR.msg;
        result.data = err;
        res.send(result);
    });
});

module.exports = router;
