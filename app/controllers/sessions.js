var express = require('express');
var	router = express.Router();
//var	db = require('../models');

module.exports = function(app) {
	app.use('/', router);
};

/*router.get('/helloworld', function serveHelloWorld(req, res) {
	res.render('simples/helloworld',
		{title : 'heheheh'}
	);
});
//login


//logout

//verify*/