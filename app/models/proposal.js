// Example model
var Item = require('./item');

module.exports = function(sequelize, DataTypes) {

  var Proposal = sequelize.define('Proposal', {
    ProposalCode: {
      type: DataTypes.STRING,
      primary: true
    },
    ProposalTitle: DataTypes.STRING,
    Category: DataTypes.STRING,
    Department: DataTypes.STRING,
    PrimaryName: DataTypes.STRING,
    PrimaryTitle: DataTypes.STRING,
    PrimaryPhone: DataTypes.STRING,
    PrimaryEmail: DataTypes.STRING,
    PrimaryMail: DataTypes.STRING,
    BudgetName: DataTypes.STRING,
    BudgetTitle: DataTypes.STRING,
    BudgetPhone: DataTypes.STRING,
    BudgetEmail: DataTypes.STRING,
    BudgetMail: DataTypes.STRING,
    DeanName: DataTypes.STRING,
    DeanTitle: DataTypes.STRING,
    DeanPhone: DataTypes.STRING,
    DeanEmail: DataTypes.STRING,
    DeanMail: DataTypes.STRING,
    StudentName: DataTypes.STRING,
    StudentTitle: DataTypes.STRING,
    StudentPhone: DataTypes.STRING,
    StudentEmail: DataTypes.STRING,
    StudentMail: DataTypes.STRING,
    Abstract: {
      type: DataTypes.STRING,
      validate: {
        max: 800
      }
    },
    Background: {
      type: DataTypes.STRING,
      validate: {
        max: 800
      }
    },
    CategoryJustification: {
      type: DataTypes.STRING,
      validate: {
        max: 500
      }
    },
    Benefits: {
      type: DataTypes.STRING,
      validate: {
        max: 800
      }
    },
    AccessRestrictions: {
      type: DataTypes.STRING,
      validate: {
        max: 500
      }
    },
    Hours: DataTypes.INTEGER,
    Days: DataTypes.STRING,
    DepartmentalResources: {
      type: DataTypes.STRING,
      validate: {
        max: 500
      }
    },
    InstallationTimeline: DataTypes.STRING(45),
    Status: DataTypes.STRING(45)

  }

  // , {
  //   classMethods: {
  //     associate: function(models) {
  //       Proposal.hasMany(models.Item);
  //       // example on how to add relations
  //       // Article.hasMany(models.Comments);
  //     }
  //   }
  // }

  );

  return Proposal;
};
