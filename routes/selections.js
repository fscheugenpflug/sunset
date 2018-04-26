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
  let teamID = req.body.team_id;
  let leagueID = req.body.league_id;
  let user = req.session.currentUser._id;
  req.session.currentUser.team = req.body.team;
  req.session.currentUser.team_id = req.body.team_id;
  req.session.currentUser.league_id = req.body.league_id;
  User.findOneAndUpdate({ _id: user }, { $set: { team: selectedTeam, team_id: teamID, league_id: leagueID } })
    .then(() => {
      res.json({ redirect: '/dashboard' });
    })
    .catch(next);
});

module.exports = router;
