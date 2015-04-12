var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/',function(req,res,next){
	res.render('index');
});

router.get('/article', function (req, res, next) {
  db.Article.findAll().success(function (articles) {
    res.render('article', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/helloworld',function(req,res,next){
	res.render('helloworld',{
		title: 'Hello World'
	});
	
});

router.get('/createProposal.html', function(req,res, next){
	res.render('createProposal');
});
