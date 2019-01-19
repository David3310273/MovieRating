var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var RegisterRouter = require('./routes/register');
var genresRouter = require('./routes/genres');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(session({
    secret: 'keyboard cat', 
    cookie: {
      maxAge: 600000
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './node_modules/admin-lte')));
app.use(express.static(path.join(__dirname, './public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/register', RegisterRouter);
app.use('/genres', genresRouter);

// mongodb connection
mongoose.connect(config.db);

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.db);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
