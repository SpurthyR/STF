var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'stf'
    },
    port: 3000,
    db: 'mysql://root:Spuriya#2@localhost:3306/StudentTechnologyFee'
  },

  test: {
    root: rootPath,
    app: {
      name: 'stf'
    },
    port: 1222,
    db: 'mysql://localhost/stf-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'stf'
    },
    port: 1244,
    db: 'mysql://localhost:3306/stf-production'
  }
};

module.exports = config[env];
