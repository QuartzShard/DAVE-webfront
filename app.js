
var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env')})
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var passport = require('passport')
var LocalStratergy = require('passport-local')
var db = require('./db/db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
  {
    secret: process.env.SECRET,
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized: false,
  }
))

passport.use(new LocalStratergy(
  (uname,password,cb) => {
    db.get('users').findOne({username:uname},(err,user)=>{
      if (err) return cb(err, false)
      if (password == user.password) {
        return cb(null, user);
      }
    return cb(null, false);
    })
  }
))


passport.serializeUser((user, cb) => {
  //cb(null, user.username)
  cb(null,user.id)
})

passport.deserializeUser((user, cb)=>{
  db.get('users').findOne({_id:user},(err,user)=>{
    if (err) return cb(err, false)
    return cb(null, user);
  })
})

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/index'));
app.use('/app', require('./routes/approutes'))
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
