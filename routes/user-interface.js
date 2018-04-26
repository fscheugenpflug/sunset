'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user-data.js');
const QRCode = require('qrcode');
var base64Img = require('base64-img');

QRCode.toDataURL('https://sunsetsports.herokuapp.com/auth/login')
  .then(url => {
    base64Img.img(url, 'public/images/auth/qrcode', 'qrcode', (err, filepath) => {
      if (err) {
        console.log(err);
      }
    }
    );
  })
  .catch(err => {
    console.error(err);
  });
// const segs = [{ data: 'req.session.currentUser' }, { data: "https://sunsetsports.herokuapp.com/dashboard" }];

router.post('/dashboard', (req, res, next) => {
  res.json({redirect: '/dashboard'});
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
