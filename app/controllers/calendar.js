var express = require('express');
var	router = express.Router();
//var	db = require('../models');

module.exports = function(app) {
	app.use('/', router);
};

router.get('/calendar', function serveCalendar(req, res) {
	res.render('calendar',
		{title : 'Calendar'}
	);
});