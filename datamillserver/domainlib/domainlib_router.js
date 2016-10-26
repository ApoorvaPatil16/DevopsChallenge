var mongoose = require('mongoose');
var express = require('express');
var app = express();
var DomainLib = require('./domainlib');
var domainProcessor = require('./domainlibprocessor');
var domainlib_router = express.Router();
var primitive = [{
    email: "admin",
    name: "String",
    description: "Base type String",
    type: "Primitive",
    base: "String",
    pattern: null,
    range: [{
        rangeOf: "words",
        min: 1,
        max: 3
    }, {
        rangeOf: "length",
        min: 6,
        max: 30
    }]
}, {
    email: "admin",
    name: "Number",
    description: "Base type Number",
    type: "Primitive",
    base: "Number",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1000,
        max: 100000
    }]
}, {
    email: "admin",
    name: "Decimal",
    description: "Base type Decimal",
    type: "Primitive",
    base: "Decimal",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1000,
        max: 100000
    }]
}, {
    email: "admin",
    name: "Date",
    description: "Base type Date",
    type: "Primitive",
    base: "Date",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1472668200,
        max: 1474569000
    }]
}, {
    email: "admin",
    name: "Boolean",
    description: "Base type Boolean",
    type: "Primitive",
    base: "Boolean",
    pattern: null
}, {
    email: "admin",
    name: "Hexadecimal",
    description: "Base type Boolean",
    type: "Primitive",
    base: "Hexadecimal",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: null,
        max: 16777215
    }]
}, {
    email: "admin",
    name: "TimeStamp",
    description: "Base type TimeStamp",
    type: "Primitive",
    base: "TimeStamp",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1472668200,
        max: 1474569000
    }]
}, {
    email: "admin",
    name: "SequentialDate",
    description: "Base type Date",
    type: "Primitive",
    base: "SequentialDate",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1472668200,
        max: 1474569000
    }]
}, {
    email: "admin",
    name: "SequentialTimeStamp",
    description: "Base type TimeStamp",
    type: "Primitive",
    base: "SequentialTimeStamp",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1472668200,
        max: 1474569000
    }]
}, {
    email: "admin",
    name: "SequentialNumber",
    description: "Base type Number",
    type: "Primitive",
    base: "SequentialNumber",
    pattern: null,
    range: [{
        rangeOf: "value",
        min: 1000,
        max: 10000
    }]
}]
DomainLib.insertMany(primitive, function(err, res) {
    console.log("err", err);
    console.log("suc", res);
});
domainlib_router.post('/', function(req, res) {
    try {
        req.body.email = req.email;
        domainProcessor.createNewDomain(req.body, function(success) {
            res.status(201).json(success);
        }, function(err) {
            console.log("Error occurred in adding new domain: ", err);
            res.status(500).json({
                error: "Internal error occurred, please report"
            });
        });
    } catch (err) {
        console.log("Error occurred in adding new domain:", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

domainlib_router.get('/:type', function(req, res) {
    try {
        domainProcessor.getDomain(req, function(success) {
            res.status(201).json(success);
        }, function(err) {
            console.log("Error occurred in getting domain: ", err);
            res.status(500).json({
                error: "Internal error occurred, please report"
            });
        })
    } catch (err) {
        console.log("Error occurred in getting domain: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});
domainlib_router.patch('/updateData', function(req, res) {
    try {
        req.body.email = req.email;
        domainProcessor.updateDomain(req, function(success) {
            res.status(201).json(success);
        }, function(err) {
            console.log("Error occurred in updating domain: ", err);
            res.status(500).json({
                error: "Internal error occurred, please report"
            });
        })
    } catch (err) {
        console.log("Error occurred in updating domain: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});
module.exports = domainlib_router;
