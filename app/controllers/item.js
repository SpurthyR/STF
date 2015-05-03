var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function(app) {
  app.use('/', router);
};


router.post('/items/new', function(req, res) {
   db.Item.create(req.body).then(function(){
      res.json({message: "Success"})
   })
});
