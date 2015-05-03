// Example model
var Proposal = require('proposal');

module.exports = function (sequelize, DataTypes) {

  var Item = sequelize.define('Item', {
    ProposalCode: DataTypes.STRING,
    ItemCode: DataTypes.STRING,
    Name: DataTypes.STRING,
    Group: DataTypes.STRING,
    Quantity: DataTypes.INTEGER,
    Price: DataTypes.FLOAT,
    Type: DataTypes.STRING,
    Justification: {
      type: DataTypes.STRING,
      validate: {max: 500}
    },
    Description: {
      type: DataTypes.STRING,
      validate: {max: 500}
    },

  }, {
    classMethods: {
      associate: function (models) {
        //Addig Foreign key relationship
        Item.belongsTo(models.Proposal);
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Item;
};

