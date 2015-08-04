var express = require('express');
var	router = express.Router();
var	db = require('../models');
var session = require("express-session");
var passport = require('passport');

module.exports = function(app) {
	app.use('/', router);
};

router.get('/login', function login(req, res) {



/*	res.render('login', {
		title : 'heheheh'
	});*/
});

//login

//logout

//verify