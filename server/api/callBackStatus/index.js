'use strict'

var express = require('express');
var controller = require('./callBackStatus.controller');

var router = express.Router();

router.get('/', controller.getAll);

module.exports = router;