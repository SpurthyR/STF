var express = require('express');
var	router = express.Router();
var	db = require('../models');

module.exports = function(app) {
	app.use('/', router);
};

router.get('/helloworld', function(req, res) {
	res.render('helloworld',
		{title : "heheheh"}
	);
});

router.get('/about', function(req, res) {
	res.render('about', {
		title : "About The STF",
		examples : ['Over 200 iMacs for Odegaard',
				'Equipment for the Undergraduate Theater Society',
				'U-Drive Storage',
				'Ionization Source for Department of Chemistry',
				'Clickers for the ASUW Senate',
				'Space Scout appropriated',
				'Dozens of computer labs accross campus',
				'Microsoft Software for all students',
				'Hardware and Software for The Daily',
				'Next Generation Sequencing Pipeline for the Biology Department',
				'Equipment for Earth and Space Sciences',
				'Graphics Processing Units for Applied Mathematics']
	});
});

router.get('/contact', function(req, res) {
	res.render('contact', {
		title : "Contact Us",
		contacts : [{
			title : 'Chair',
			name : "David Goldstone",
			email : "STFChair@uw.edu"
		}, {	
			title : 'Program Coordinator',
			name : "Alton Lu",
			email : "TechFee@uw.edu"
		}, {
			title : "Web Developer",
			name : "Bryce Kolton",
			email : "BBKolton@uw.edu"
		}]
	});
});