var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var appconf = require('./appconf');

// var jsonServer = require('json-server');
var mongoose = require('mongoose');
mongoose.connect(appconf.MONGO_HOST + ":" + appconf.MONGO_PORT + "/" + appconf.MONGO_DB);
var datamodeldefination = require('./datamillserver/datamodel/datamodel_router');

//APP logger
// var logger = require("./applogger");
var nav_router = require('./datamillserver/nav_router');
var datasource = require('./datamillserver/datasource/datasourceRouter');
var domainlib_router = require('./datamillserver/domainlib/domainlib_router');
var oauth_router = require('./datamillserver/oauth/authlogin');
var isAuthenticated = require('./datamillserver/authorization/authorize').isAuthenticated;
var profile_router = require('./datamillserver/users/profile_router');
var validate = require('./datamillserver/datasource/validate');
var dataSourceCache = require('./generatorloops/dataSourceCache');
var scheduledatasrc = require('./generatorloops/schedulestart');
var datausage_router = require('./datamillserver/datausage/datausageRouter');
//Express App created
var app = express();
dataSourceCache.startBufferring();
//scheduledatasrc.sdatamodecheduledatasource();
app.onAppStart = function(addr) {
    // logger.info("DataMill web app is now Running on port:",addr.port);
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/profile', isAuthenticated, profile_router);
// app.use('/api', jsonServer.router('db.json'));
app.use('/navbarItems', nav_router);
// app.use('/createdatasource', createdatasource);
app.use('/datasources', isAuthenticated, datasource);
app.use('/validatename', isAuthenticated, validate);
app.use('/domain', isAuthenticated, domainlib_router);
app.use(express.static(path.join(__dirname, 'webapp')));
app.use(express.static(path.join(__dirname, 'bower_modules')));
// app.use(express.static(path.join(__dirname, 'public')));
app.post('/login', function(req, res) {

});
app.use('/', oauth_router);
app.use('/datamodel', isAuthenticated, datamodeldefination);
<<<<<<< HEAD

=======
app.use('/stats', isAuthenticated, datausage_router);
>>>>>>> 3b071d4b76ace734126dac226f4ee3eda674be52
app.use(function(req, res, next) {
    var err = new Error('Resource not found');
    err.status = 404;
    return res.status(err.status).json({
        "error": err.message
    });
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        // logger.error("Internal error in watch processor: ", err);
        return res.status(err.status || 500).json({
            "error": err.message
        });
    });
}

app.use(function(err, req, res, next) {
    // logger.error("Internal error in watch processor: ", err);
    return res.status(err.status || 500).json({
        "error": err.message
    });
});

module.exports = app;
