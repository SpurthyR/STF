var express = require('express');
var	router = express.Router();
var	db = require('../models');


module.exports = function(app) {
	app.use('/', router);
};

/*router.get('/proposals', function(req, res, next) {
	res.render('proposals');
});
*/


router.get('/proposals/create', function(req, res, next) {
	res.render('proposals/create');
});

router.get('/proposals/:id', function(req, res) {
	db.Proposal.find({
		where: {
			id: req.params.id
		}
	}).then(function(proposal) {
		db.Item.findAll({
			where: {
				ProposalCode: req.params.id
			}
		}).then(function(item){
			//console.log("item:");
			//console.log(item)
			res.render('proposals/update', {
				proposal: proposal,
				items: item
			});
		});
	});
});


router.post('/proposals/:id', function(req, res) {
	db.Proposal.find({
		where: {
			id: req.params.id
		}
	}).then(function(proposal) {
		if (!proposal) {
			res.send(404);
		}

		var fromForm = {
			ProposalTitle: req.body["title"],
			Category: req.body["category"],
			Department: req.body["department"],
			PrimaryName: req.body["PrimaryName"],
			PrimaryTitle: req.body["primary-title"],
			PrimaryEmail: req.body["primary-email"],
			PrimaryPhone: req.body["primary-phone"],
			PrimaryMail: req.body["primary-mail"],
			BudgetName: req.body["budget-name"],
			BudgetTitle: req.body["budget-title"],
			BudgetEmail: req.body["budget-email"],
			BudgetPhone: req.body["budget-phone"],
			BudgetMail: req.body["budget-mail"],
			DeanName: req.body["ddh-name"],
			DeanTitle: req.body["ddh-title"],
			DeanEmail: req.body["ddh-email"],
			DeanPhone: req.body["ddh-phone"],
			DeanMail: req.body["ddh-mail"],
			StudentName: req.body["stu-name"],
			StudentTitle: req.body["stu-title"],
			StudentEmail: req.body["stu-email"],
			StudentPhone: req.body["stu-phone"],
			StudentMail: req.body["stu-mail"],
			Abstract: req.body["abstract"],
			CategoryJustification: req.body["CategoryJustification"],
			Background: req.body["Background"],
			Benefits: req.body["Benefits"],
			AccessRestrictions: req.body["AccessRestrictions"],
			Hours: req.body["Hours"],
			Days: req.body["Days"],
			DepartmentalResources: req.body["DepartmentalResources"],
			InstallationTimeline: req.body["InstallationTimeline"]
		}

		console.log(fromForm);
		console.log("Hours" + fromForm.Hours);
		if(fromForm.Hours===''){
			fromForm.Hours=0;
		}

		db.Proposal.update(fromForm, {
			where: {
				id: req.params.id
			}
		}).then(function(e) {
			res.json({
				message: "Success"
			});
		});
	});
});



router.post('/proposals', function(req, res, next) {
	// Get our form values. These rely on the "name" attributes
	var ProposalTitle = req.body.title;
	var Category = req.body.category;
	var Department = req.body.department;
	//Contacts
	var PrimaryName = req.body["PrimaryName"];
	var PrimaryTitle = req.body["primary-title"];
	var PrimaryEmail = req.body["primary-email"];
	var PrimaryPhone = req.body["primary-phone"];
	var PrimaryMail = req.body["primary-mail"];
	var BudgetName = req.body["budget-name"];
	var BudgetTitle = req.body["budget-title"];
	var BudgetEmail = req.body["budget-email"];
	var BudgetPhone = req.body["budget-phone"];
	var BudgetMail = req.body["budget-mail"];
	var DeanName=req.body["ddh-name"];
	var DeanTitle = req.body["ddh-title"];
	var DeanEmail = req.body["ddh-email"];
	var DeanPhone = req.body["ddh-phone"];
	var DeanMail = req.body["ddh-mail"];
	var StudentName=req.body["stu-name"];
	var StudentTitle = req.body["stu-title"];
	var StudentEmail = req.body["stu-email"];
	var StudentPhone = req.body["stu-phone"];
	var StudentMail = req.body["stu-mail"];
	var Abstract = req.body["abstract"];
	var CategoryJustification = req.body["CategoryJustification"];
	var Background = req.body["background"];
	var Benefits = req.body["Benefits"];
	var AccessRestrictions = req.body["AccessRestrictions"];
	var Hours = req.body["Hours"];
	if(Hours===''){
		Hours=0;
	}
	var Days = req.body["Days"];
	var DepartmentalResources = req.body["DepartmentalResources"];
	var InstallationTimeline = req.body["InstallationTimeline"];

	console.log("Creating Proposal");

	db.Proposal.create({
		ProposalTitle: ProposalTitle,
		Category: Category,
		Department: Department,
		PrimaryName: PrimaryName,
		PrimaryTitle: PrimaryTitle,
		PrimaryPhone: PrimaryPhone,
		PrimaryEmail: PrimaryEmail,
		PrimaryMail: PrimaryMail,
		BudgetName: BudgetName,
		BudgetTitle: BudgetTitle,
		BudgetPhone: BudgetPhone,
		BudgetEmail: BudgetEmail,
		BudgetMail: BudgetMail,
		DeanName: DeanName,
		DeanTitle: DeanTitle,
		DeanPhone: DeanPhone,
		DeanEmail: DeanEmail,
		DeanMail: DeanMail,
		StudentName: StudentName,
		StudentTitle: StudentTitle,
		StudentPhone: StudentPhone,
		StudentEmail: StudentEmail,
		StudentMail: StudentMail,
		Abstract: Abstract,
		Background: Background,
		CategoryJustification: CategoryJustification,
		Benefits: Benefits,
		AccessRestrictions: AccessRestrictions,
		Hours: Hours,
		Days: Days,
		DepartmentalResources: DepartmentalResources,
		InstallationTimeline: InstallationTimeline
	}).then(function(proposal) {
		res.redirect('/proposals/' + proposal.id);
	});
});


router.get('/proposals/browse', function(req, res, next) {
	db.Proposal.findAll().success(function(proposals) {
		res.render('proposals/browse',{
			proposals: proposals
		});
	});
});

router.get('/proposal/:id', function(req,res,next) {
	db.Proposal.find({
		where: {
			id: req.params.id
		}
	}).then(function(proposal) {
		db.Metric.findAll().then(function(portableMetrics) {
			var data = {};
			console.log(proposal.dataValues.Category);
			console.log(proposal);
			portableMetrics.forEach(function(val, index) {
				if (val['category'].match(/General.*/) || val['category'] === proposal.Category) {
					if (data[val['category']] === undefined) {
						data[val['category']] = [];
					}
					data[val['category']].push({
						category: val['category'],
						Metric: val['Metric']
					});
				}
			});
			res.render('proposals/proposal', {
				proposal : proposal,
				data : data
			});
		});
	});
});
// router.get('/article', function(req, res, next) {
//   db.Article.findAll().success(function(articles) {
//     res.render('article', {
//       title: 'Generator-Express MVC',
//       articles: articles
//     });
//   });
// });

// router.get('/proposal', function(req, res, next) {
//   //db.Metric.findAll({ where: {category: 'General%'}})
//   db.Metric.findAll().then(function(portableMetrics) {
//     //console.log("Fetched Metric");
//     //console.log(portableMetrics);
//     var data = {};
//     portableMetrics.forEach(function(val, index) {
//       // console.log(val);
//       if (val['category'].match(/General.*/) || val['category'] === 'ComputerLabs') {
//         //if(val['category'] === 'Collaborative' || val['category'].match(/General/g).length > 0 ) {


//         if (data[val['category']] == undefined) {
//           data[val['category']] = [];
//         }
//         data[val['category']].push({
//           category: val['category'],
//           Metric: val['Metric']
//         });
//       }
//     });

//     console.log(data);
//     res.render('proposal', {
//       data: data
//     });
//   });

// });

// router.get('/helloworld', function(req, res, next) {
//   res.render('helloworld', {
//     title: 'Hello World'
//   });

// });


// // var router = express.Router();

// // router.get('/', auth.isAuthenticated('admin'), controller.index);
// // router.get('/:id', auth.isAuthenticated('admin'), controller.show);
// // router.post('/', auth.hasRole('admin'), controller.create);
// // router.put('/:id', auth.hasRole('admin'), controller.update);
// // router.patch('/:id', auth.hasRole('admin'), controller.update);
// // router.delete('/:id', auth.hasRole('admin'), controller.destroy);


// router.get('/createProposal', function(req, res, next) {
//   res.render('createProposal');
// });

// /* POST to Add Proposal Service */
// router.post('/addproposal', function(req, res, next) {


//   // Get our form values. These rely on the "name" attributes
//   var title = req.body.title;
//   var category = req.body.category;
//   var department = req.body.department;
//   //Contacts
//   var primaryTitle = req.body["primary-title"];
//   var primaryEmail = req.body["primary-email"];
//   var primaryPhone = req.body["primary-phone"];
//   var primaryMail = req.body["primary-mail"];
//   var budgetTitle = req.body["budget-title"];
//   var budgetEmail = req.body["budget-email"];
//   var budgetPhone = req.body["budget-phone"];
//   var budgetMail = req.body["budget-mail"];
//   var ddhTitle = req.body["ddh-title"];
//   var ddhEmail = req.body["ddh-email"];
//   var ddhPhone = req.body["ddh-phone"];
//   var ddhMail = req.body["ddh-mail"];
//   var stuTitle = req.body["stu-title"];
//   var stuEmail = req.body["stu-email"];
//   var stuPhone = req.body["stu-phone"];
//   var stuMail = req.body["stu-mail"];
//   //Details
//   var abstract = req.body["abstract"];
//   var justification = req.body["justification"];
//   var background = req.body["background"];
//   var benefits = req.body["benefits"];
//   var restrictions = req.body["restrictions"];
//   var hours = req.body["hours"];
//   var days = req.body["days"];
//   var resources = req.body["resources"];
//   var timeline = req.body["timeline"];

//   console.log("Creating Proposal");

//   db.Proposal.create({
//     ProposalTitle: title,
//     Category: category,
//     Department: department,
//     PrimaryTitle: primaryTitle,
//     PrimaryPhone: primaryPhone,
//     PrimaryEmail: primaryEmail,
//     PrimaryMail: primaryMail,
//     BudgetTitle: budgetTitle,
//     BudgetPhone: budgetPhone,
//     BudgetEmail: budgetEmail,
//     BudgetMail: budgetMail,
//     DeanTitle: ddhTitle,
//     DeanPhone: ddhPhone,
//     DeanEmail: ddhEmail,
//     DeanMail: ddhMail,
//     StudentTitle: stuTitle,
//     StudentPhone: stuPhone,
//     StudentEmail: stuEmail,
//     StudentMail: stuMail,
//     Abstract: abstract,
//     Background: background,
//     CategoryJustification: justification,
//     Benefits: benefits,
//     AccessRestrictions: restrictions,
//     Hours: hours,
//     Days: days,
//     DepartmentalResources: resources,
//     InstallationTimeline: timeline
//   }).then(function(proposal) {
//     console.log(proposal)
//     res.render('createProposal', {
//       proposal: proposal
//     })
//   });


//   /*db.Proposal.update({
//     PrimaryTitle: primaryTitle,
//     PrimaryPhone: primaryPhone,
//     PrimaryEmail: primaryEmail,
//     PrimaryMail: primaryMail,
//     BudgetTitle: budgetTitle,
//     BudgetPhone: budgetPhone,
//     BudgetEmail: budgetEmail,
//     BudgetMail: budgetMail,
//     DeanTitle: ddhTitle,
//     DeanPhone: ddhPhone,
//     DeanEmail: ddhEmail,
//     DeanMail: ddhMail,
//     StudentTitle: stuTitle,
//     StudentPhone: stuPhone,
//     StudentEmail: stuEmail,
//     StudentMail: stuMail,
//   },
//   {where:{
//     ProposalTitle: title
//   }});*/

//   console.log("Entering Details");

//   /* db.Proposal.update({
//      Abstract: abstract,
//      Background: background,
//      CategoryJustification: justification,
//      Benefits: benefits,
//      AccessRestrictions: restrictions,
//      Hours: hours,
//      Days: days,
//      DepartmentalResources: resources,
//      InstallationTimeline: timeline
//    },
//    {where: {
//      ProposalTitle: title
//    }});*/
// });
