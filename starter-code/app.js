'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const auth = require('./routes/auth');
const usersRouter = require('./routes/users');
// const selection = require('./routes/selection');

const app = express();

// -- connect to the databse

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/users', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- create session

app.use(session({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  secret: 'some-string',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// -- view engine setup

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// -- middlewars

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  app.locals.user = req.session.currentUser;
  next();
});

// -- routes

app.use('/', index);
app.use('/users', usersRouter);
app.use('/auth', auth);
// app.use('/selection', selection);

// -- 404 and error handler

app.use((req, res, next) => {
  res.status(404);
  res.render('errors/not-found');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    res.status(500);
    res.render('errors/error');
  }
});

module.exports = app;
