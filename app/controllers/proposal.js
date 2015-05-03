var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  _ = require('lodash');


module.exports = function(app) {
  app.use('/', router);
};

router.get('/proposal', function(req, res, next) {
  res.render('proposals');
});


// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Field.findById(req.params.id, function (err, field) {
//     if (err) { return handleError(res, err); }
//     if(!field) { return res.send(404); }
//     var updated = _.merge(field, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, field);
//     });
//   });
// };


router.get('/proposals/new', function(req, res, next) {
  res.render('proposal/create');
});

router.get('/proposals/:id', function(req, res) {

  db.Proposal.find({
    where: {
      id: req.params.id
    }
  }).then(function(proposal) {
    res.render('proposal/update', {
      proposal: proposal
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
      CategoryJustification: req.body["justification"],
      Background: req.body["background"],
      Benefits: req.body["benefits"],
      AccessRestrictions: req.body["restrictions"],
      //Hours:  req.body["hours"],
      //Days:  req.body["days"],
      DepartmentalResources: req.body["resources"],
      InstallationTimeline: req.body["timeline"]
    }

    console.log(fromForm);


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
})



router.post('/proposals', function(req, res, next) {
  // Get our form values. These rely on the "name" attributes
  var ProposalTitle = req.body.title;
  var Category = req.body.category;
  var Department = req.body.department;
  //Contacts
  var PrimaryTitle = req.body["primary-title"];
  var PrimaryEmail = req.body["primary-email"];
  var PrimaryPhone = req.body["primary-phone"];
  var PrimaryMail = req.body["primary-mail"];
  var BudgetTitle = req.body["budget-title"];
  var BudgetEmail = req.body["budget-email"];
  var BudgetPhone = req.body["budget-phone"];
  var BudgetMail = req.body["budget-mail"];
  var DeanTitle = req.body["ddh-title"];
  var DeanEmail = req.body["ddh-email"];
  var DeanPhone = req.body["ddh-phone"];
  var DeanMail = req.body["ddh-mail"];
  var StudentTitle = req.body["stu-title"];
  var StudentEmail = req.body["stu-email"];
  var StudentPhone = req.body["stu-phone"];
  var StudentMail = req.body["stu-mail"];
  var Abstract = req.body["abstract"];
  var CategoryJustification = req.body["justification"];
  var Background = req.body["background"];
  var Benefits = req.body["benefits"];
  var AccessRestrictions = req.body["restrictions"];
  var Hours = req.body["hours"];
  var Days = req.body["days"];
  var DepartmentalResources = req.body["resources"];
  var InstallationTimeline = req.body["timeline"];

  console.log("Creating Proposal");

  db.Proposal.create({
    ProposalTitle: ProposalTitle,
    Category: Category,
    Department: Department,
    PrimaryTitle: PrimaryTitle,
    PrimaryPhone: PrimaryPhone,
    PrimaryEmail: PrimaryEmail,
    PrimaryMail: PrimaryMail,
    BudgetTitle: BudgetTitle,
    BudgetPhone: BudgetPhone,
    BudgetEmail: BudgetEmail,
    BudgetMail: BudgetMail,
    DeanTitle: DeanTitle,
    DeanPhone: DeanPhone,
    DeanEmail: DeanEmail,
    DeanMail: DeanMail,
    StudentTitle: StudentTitle,
    StudentPhone: StudentPhone,
    StudentEmail: StudentEmail,
    StudentMail: StudentMail,
    Abstract: Abstract,
    Background: Background,
    CategoryJustification: CategoryJustification,
    Benefits: Benefits,
    AccessRestrictions: AccessRestrictions,
    //Hours: Hours,
    //Days: Days,
    DepartmentalResources: DepartmentalResources,
    InstallationTimeline: InstallationTimeline
  }).then(function(proposal) {
    res.redirect('/proposals/' + proposal.id);
  });
});
