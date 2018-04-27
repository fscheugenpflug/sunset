'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/dashboard');
  } else {
    res.render('starter-page', { title: 'Express' });
  }
});

router.get('/style-guide', (req, res, next) => {
  res.render('style-guide');
});

module.exports = router;
