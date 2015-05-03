var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'stf'
    },
    port: 3001,
    db: 'mysql://root:root@localhost:3306/STF'
  },

  test: {
    root: rootPath,
    app: {
      name: 'stf'
    },
    port: 1222,
    db: 'mysql://root:root@localhost/stf-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'stf'
    },
    port: 1244,
    db: 'mysql://root:root@localhost:3306/stf-production'
  }
};

module.exports = config[env];
