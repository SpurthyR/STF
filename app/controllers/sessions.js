var express = require('express');
var	router = express.Router();
var	db = require('../models');
var passport = require('passport');
var saml = require('passport-saml');

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