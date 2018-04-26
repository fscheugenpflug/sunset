// 'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user-data.js');

// /* GET home page. */
router.get('/dashboard', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('userinterface/dashboard');
  } else {
    res.redirect('/');
  }
});

router.post('/dashboard', (req, res, next) => {
  let selectedTeam = req.body.team;
  let user = req.session.currentUser._id;
  req.session.currentUser.team = req.body.team;
  User.findOneAndUpdate({ _id: user }, { $set: { team: selectedTeam } })
    .then(() => {
      res.json({ redirect: 'http://localhost:3000/dashboard' });
    })
    .catch(next);
});

module.exports = router;
