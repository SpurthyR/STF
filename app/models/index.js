var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {};

// var sequelize = new Sequelize("mysql://root:Spuriya#2@localhost:3306/StudentTechnologyFee"
// , {
//   storage: config.storage
// });

var sequelize = new Sequelize('test', 'root', 'STFP@ss', {
  host: "127.0.0.1",
  port: 3306
})


fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
