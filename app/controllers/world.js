var express = require('express');
var	router = express.Router();
var	db = require('../models');

module.exports = function(app) {
	app.use('/', router);
};

router.get('/helloworld', function(req, res) {
	res.render('helloworld');
})