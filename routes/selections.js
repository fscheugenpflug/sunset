// 'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user-data.js');
// // const teamInfoApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';

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
  User.findOneAndUpdate({_id: user}, {$set: {team: selectedTeam}})
    .then(() => {
      res.json({redirect: 'http://localhost:3000/dashboard'});
    })
    .catch(next);
});

router.get('/statistics', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('userinterface/statistics');
  } else {
    res.redirect('/');
  }
});

router.get('/upcoming', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('userinterface/upcoming');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
