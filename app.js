var express = require('express'); //the xpress app framework
var glob = require('glob'); //allows for globbing files by names
var favicon = require('serve-favicon'); //literally oinly serves favicons
var logger = require('morgan'); //logs things to files 
var cookieParser = require('cookie-parser'); //no explanation needed
var bodyParser = require('body-parser'); //parses json, html, etc to html
var compress = require('compression'); //compresses files and output to users
var passport = require('passport'); //user authentication
var shib = require('passport-uwshib'); //for shiubboleth authentication
var session = require('express-session'); //for user sessions

var config = require('./config/config'); //configuration file 
var db = require('./app/models'); //database connections

var app = express(); //let's get started!

app.set('views', config.root + '/app/views');
app.set('view engine', 'jade');

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.use(favicon('/STF/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(express.static(config.root + '/public'));

//removes evil trailing slashes off of requests for pages. This fixes
//issues with error pages not loading if we're deep in folder
//hierarchies, and simplifies the types of pages we have to look for.
app.use(function removeTrailingSlashes(req, res, next) {
	var url = req.url;
	if(url.substring(url.length- 1, url.length) == '/' && url.length > 1) {
		res.redirect(301, url.substring(0, url.length - 1));
	} else {
		next();
	}
});

//grabs all the controllers in the folder, and adds them to the controllers
//list. synchronous function.
var controllers = glob.sync(config.root + '/app/controllers/*.js');
controllers.forEach(function assignController(controller) {
	require(controller)(app);
});


app.use(function fileNotFound(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});








/*


var domain = process.env.DOMAIN
if (!domain || domain.length == 0) {
	throw new Error('Specify a domain variable!');
}

var publicCert = fs.readFileSync('./security/server-cert.pem', 'utf-8');
var privateKey = fs.readFileSync('./security/server-pvk.pem', 'utf-8');

var strategy = new shib.Strategy({
    entityId: process.env.DOMAIN,
    privateKey: privateKey,
    callbackUrl: loginCallbackUrl,
    domain: domain
});

passport.use(strategy);

//shibboleth metadata response
app.get(shib.urls.metadata, shib.metadataRoute(strategy, publicCert));







*/








//if we're in development, give verbose errors
if(app.get('env') === 'development'){
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
			title: 'error'
		});
	});
}

//dont give verbose errors 
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {},
		title: 'error'
	});
});


db.sequelize
	.sync()
	.then(function() {
		app.listen(config.port);
	}).catch(function(e) {
		throw new Error(e);
	});

