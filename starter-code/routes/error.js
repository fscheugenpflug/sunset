'use strict';

const express = require('express');
const router = express.Router();

router.get('/error', (req, res, next) => {
  res.render('error');
});

router.get('/notfound', (req, res, next) => {
  res.render('notfound');
});
