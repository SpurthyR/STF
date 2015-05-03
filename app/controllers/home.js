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

router.get('/proposal', function (req, res, next) {
  //db.Metric.findAll({ where: {category: 'General%'}})
  db.Metric.findAll().then(function (portableMetrics) {
    //console.log("Fetched Metric");
    //console.log(portableMetrics);
    var data = {}; 
    portableMetrics.forEach(function(val, index){
     // console.log(val);
        if(val['category'].match(/General.*/) || val['category']==='ComputerLabs') {
      //if(val['category'] === 'Collaborative' || val['category'].match(/General/g).length > 0 ) {
       

      if(data[val['category']] == undefined) {
        data[val['category']] = [];
      }
      data[val['category']].push({
        category: val['category'],
        Metric: val['Metric']
      }); 
      }
    });

    console.log(data);
    res.render('proposal', {
      data: data
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

router.get('/browse-proposals', function(req,res, next){
  res.render('browse-proposals')

});

/* POST to Add Proposal Service */
router.post('/addproposal', function(req, res, next) {

  
    // Get our form values. These rely on the "name" attributes
    var title = req.body.title;
    var category = req.body.category;
    var department=req.body.department;
    //Contacts
    var primaryTitle=req.body["primary-title"];
    var primaryEmail=req.body["primary-email"]; 
    var primaryPhone=req.body["primary-phone"];
    var primaryMail=req.body["primary-mail"];
    var budgetTitle=req.body["budget-title"]; 
    var budgetEmail=req.body["budget-email"];
    var budgetPhone=req.body["budget-phone"];
    var budgetMail=req.body["budget-mail"];
    var ddhTitle=req.body["ddh-title"];
    var ddhEmail=req.body["ddh-email"];
    var ddhPhone=req.body["ddh-phone"];
    var ddhMail=req.body["ddh-mail"];
    var stuTitle=req.body["stu-title"];
    var stuEmail=req.body["stu-email"];
    var stuPhone=req.body["stu-phone"];
    var stuMail=req.body["stu-mail"];
    //Details
    var abstract=req.body["abstract"];
    var justification=req.body["justification"];
    var background=req.body["background"];
    var benefits=req.body["benefits"];
    var restrictions=req.body["restrictions"];
    var hours=req.body["hours"];
    var days=req.body["days"];
    var resources=req.body["resources"];
    var timeline=req.body["timeline"];

    console.log("Creating Proposal");

    db.Proposal.create({
      ProposalTitle: title, 
      Category: category, 
      Department: department,
      PrimaryTitle: primaryTitle,
      PrimaryPhone: primaryPhone,
      PrimaryEmail: primaryEmail,
      PrimaryMail: primaryMail,
      BudgetTitle: budgetTitle,
      BudgetPhone: budgetPhone,
      BudgetEmail: budgetEmail,
      BudgetMail: budgetMail,
      DeanTitle: ddhTitle,
      DeanPhone: ddhPhone,
      DeanEmail: ddhEmail,
      DeanMail: ddhMail,
      StudentTitle: stuTitle,
      StudentPhone: stuPhone,
      StudentEmail: stuEmail,
      StudentMail: stuMail,
      Abstract: abstract,
      Background: background,
      CategoryJustification: justification,
      Benefits: benefits,
      AccessRestrictions: restrictions,
      Hours: hours,
      Days: days,
      DepartmentalResources: resources,
      InstallationTimeline: timeline
    }).then(function(proposal){
      console.log(proposal)
      res.render('createProposal', {
        proposal: proposal 
      })
    });


    /*db.Proposal.update({
      PrimaryTitle: primaryTitle,
      PrimaryPhone: primaryPhone,
      PrimaryEmail: primaryEmail,
      PrimaryMail: primaryMail,
      BudgetTitle: budgetTitle,
      BudgetPhone: budgetPhone,
      BudgetEmail: budgetEmail,
      BudgetMail: budgetMail,
      DeanTitle: ddhTitle,
      DeanPhone: ddhPhone,
      DeanEmail: ddhEmail,
      DeanMail: ddhMail,
      StudentTitle: stuTitle,
      StudentPhone: stuPhone,
      StudentEmail: stuEmail,
      StudentMail: stuMail,
    },
    {where:{
      ProposalTitle: title
    }});*/

    console.log("Entering Details");
    
   /* db.Proposal.update({
      Abstract: abstract,
      Background: background,
      CategoryJustification: justification,
      Benefits: benefits,
      AccessRestrictions: restrictions,
      Hours: hours,
      Days: days,
      DepartmentalResources: resources,
      InstallationTimeline: timeline
    },
    {where: {
      ProposalTitle: title
    }});*/
});
