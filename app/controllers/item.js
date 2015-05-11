var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function(app) {
  app.use('/', router);
};


router.post('/items/new', function(req, res) {
	console.log("trying to submit");
	console.log(req.body);
   db.Item.create(req.body).then(function(item){
   	console.log("Item Created");
    res.json({message: "Success", 
    	item:item
});
   });
});

router.get('/item/:id', function(req,res,next){
	console.log("in item.js");
	console.log("executing Query with item name: " + req.params.id);
	db.Item.find({
		where: {
			id: req.params.id
		}
	}).then(function(item){
		console.log(item);
		db.Item.findAll({
			where: {
				ProposalCode: item.ProposalCode
			}
		}).then(function(items){
	
		res.render('item',{
			item: item,
			items: items
		});
	});
});
});

router.post('/item/:id', function(req, res) {
	console.log("updating item");
  db.Item.find({
    where: {
      id: req.params.id
    }
  }).then(function(item) {
    if (!item) {
      res.send(404);
    }

    db.Item.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(item) {

    	
       res.json({
       	message: "Success"
       });
    });

  });
})
