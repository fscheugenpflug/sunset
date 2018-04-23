'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('auth/login', { title: 'Express' });
});

router.get('/auth/sign-up', (req, res, next) => {
  res.render('auth/sign-up', { title: 'Express' });
});

module.exports = router;
