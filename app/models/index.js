var fs = require('fs');
var path = require('path');
var sequelize = require('sequelize');
var config = require('../../config/config');
var db = {};

// var sequelize = new sequelize("mysql://root:Spuriya#2@localhost:3306/StudentTechnologyFee"
// , {
//   storage: config.storage
// });

var sequelize = new sequelize('test', 'root', 'STFP@ss', {
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

module.exports = db;
