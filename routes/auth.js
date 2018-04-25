'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user-data.js');
const bcryptSalt = 10;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('auth/login', { title: 'Express' });
});

router.get('/sign-up', (req, res, next) => {
  res.render('auth/sign-up', { title: 'Express' });
});

/* GET users listing. */

router.post('/sign-up', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findOne({ username: username })
    .then((result) => {
      if (result) {
        console.log('Username is taken');
        res.redirect('auth/sign-up');
      } else {
        const newUser = new User({
          name,
          email,
          username: username,
          password: hashPass
        });

        newUser
          .save()
          .then((user) => {
            req.session.currentUser = user;
            console.log('New user');
            res.redirect('team-selection');
          })
          .catch(next);
      }
    });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .then(result => {
      if (!result) {
        res.redirect('/auth/login');
      } else if (bcrypt.compareSync(password, result.password)) {
        req.session.currentUser = result;
        res.redirect('home');
      }
    })
    .catch(next);
});

router.get('/team-selection', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('selection/team-selection');
  } else {
    res.redirect('/');
  }
});

router.post('/logout', (req, res, next) => {
  req.session.currentUser = null;
  res.redirect('/');
});

module.exports = router;
