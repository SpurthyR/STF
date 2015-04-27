// Example model


module.exports = function (sequelize, DataTypes) {

  var Metric = sequelize.define('Metric', {
    Metric: DataTypes.STRING,
    category: DataTypes.STRING,
    MetricCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Metric;
};

