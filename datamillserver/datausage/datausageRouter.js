var express = require('express');
var datausage_router = express.Router();
var mongoose = require('mongoose');
var datausageprocessor = require('./datausageprocessor');
datausage_router.get("/users", function(req, res) {
    try {
        datausageprocessor.getUsers(req, function(successCB) {
            res.status(201).json(successCB);
        }, function(error) {
            console.log('err', error);
        });

    } catch (err) {
        console.log("error", err);
    }
});
datausage_router.get("/datamodels", function(req, res) {
    try {
        datausageprocessor.getDatamodels(req, function(successCB) {
            res.status(201).json(successCB);
        }, function(error) {
            console.log('err', error);
        });

    } catch (err) {
        console.log("error", err);
    }

});
datausage_router.get("/datasources", function(req, res) {
    try {
        datausageprocessor.getDatasources(req, function(successCB) {
            res.status(201).json(successCB);
        }, function(error) {
            console.log('err', error);
        });

    } catch (err) {
        console.log("error", err);
    }

});
datausage_router.get("/datadomains", function(req, res) {
    try {
        datausageprocessor.getDatadomains(req, function(successCB) {
            res.status(201).json(successCB);
        }, function(error) {
            console.log('err', error);
        });

    } catch (err) {
        console.log("error", err);
    }

});
module.exports = datausage_router;
