var path = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
	development: {
		root: rootPath,
		app: {
			name: 'stf'
		},
		port: 80,
		db: 'mysql://root:STFP@ss@localhost:3306/test'
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
