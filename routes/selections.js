// 'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user-data.js');
// // const teamInfoApi = 'https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=';

// /* GET home page. */
router.get('/dashboard', (req, res, next) => {
  res.render('userinterface/dashboard');
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
  res.render('userinterface/statistics');
});

router.get('/upcoming', (req, res, next) => {
  res.render('userinterface/upcoming');
});

module.exports = router;
