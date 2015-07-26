var express = require('express');
var	router = express.Router();
//var	db = require('../models');

module.exports = function(app) {
	app.use('/', router);
};

router.get('/documents*', function serveDocsHome(req, res) {
	res.render('documents', {
		title : 'Documents',
		loc : 'home'
	});
});

/*router.get('/documents*', function serveDocs(req, res) {



	res.render('documents', {
		title : 'Documents',
		loc : "lololol"
	});
});*/