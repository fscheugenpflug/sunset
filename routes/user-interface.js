'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user-data.js');
const QRCode = require('qrcode');

// QRCode.toDataURL('req.session.currentUser')
//   .then(url => {
//     console.log(url);
//   })
//   .catch(err => {
//     console.error(err);
//   });

router.post('/dashboard', (req, res, next) => {
  let user = req.session.currentUser._id;
  const selectedTeam = req.user.team;
  res.json({redirect: 'http://localhost:3000/dashboard'});
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
