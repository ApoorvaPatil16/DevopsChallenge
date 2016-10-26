var ticker = require('./timeticker/timeticker');
var highland = require('highland')
var pipeliner = require('./pipelining/attrpipeline');
var consumepipeliner = require('./pipelining/consumepipeline');
var globalactivedatasources = require('../generatorloops/activedatasrc');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080/');

function startGeneration(datamodel, cb) {
<<<<<<< HEAD
    tickerObj = getTicker(datamodel)
    generatorFunc = getGeneratorFunc(datamodel, tickerObj);
    console.log("now to ", (new Date()));
    // console.log("pattern struct is", datamodel.patternstructure);
    console.log("the ticker obj is:", tickerObj)
    if (datamodel.delivery == 'download') globalactivedatasources.registerDataSource(datamodel);
    else { globalactivedatasources.registerDataSource(datamodel); }
    genPipeline = pipeliner.attrPipeline(datamodel.attributes);
    consumePipeline = consumepipeliner.consumePipeline(datamodel);
    var disconnectEvent = datamodel.delivery + "_" + datamodel.email + "_" + datamodel.name + "_disconnect";
=======
    //@TODO from the specified datamodel name, go fetch the object and ensure 

    if (datamodel.patterns.length > 0) {
        //Has patterns
        return startDataPatternGeneration(datamodel, cb);
    } else {
        //No patterns, simple 
        return startDataGeneration(datamodel, cb);
    }
}

function startDataPatternGeneration(datamodel, cb) {
    globalactivedatasources.registerDataSource(datamodel);
    var disconnectEvent = datamodel.delivery + "_" + datamodel.email + "_" +
        datamodel.name + "_disconnect";

    tickerObj = getTicker(datamodel)

    socket.on(disconnectEvent, function(msg) {
        tickerObj.stop(function() {
            globalactivedatasources.unregisterDataSource(datamodel);
        })
    });

    //Get All the Patterns Definition of the Datamodel 
    var datamodelPatterns = [];

    datamodelPatterns.forEach(function(pattern) {
        //Calculate volume of packets to generate using the specified mix
        var patternMix = 0; //Extract pattern mix value for the current pattern

        generatorFunc = getPatternGeneratorFunc(datamodel, pattern, patternMix,
            tickerObj);

        //Attribute pipeline is for the pattern's attribute
        genPipeline = pipeliner.attrPipeline(pattern.attributes);
        consumePipeline = consumepipeliner.consumePipeline(datamodel);

        process.nextTick(function() {
            highland(generatorFunc).pipe(genPipeline).pipe(consumePipeline).each(
                function(data) {
                    //console.log("done", data);
                    if (cb) cb(data);
                });
        });
    });
}

function startDataGeneration(datamodel, cb) {
    tickerObj = getTicker(datamodel)
    generatorFunc = getGeneratorFunc(datamodel, tickerObj);
    console.log("now to ", (new Date()));
    console.log("the ticker obj is:", tickerObj)
    if (datamodel.delivery == 'download') globalactivedatasources.registerDataSource(
        datamodel);
    else {
        globalactivedatasources.registerDataSource(datamodel);
    }
    genPipeline = pipeliner.attrPipeline(datamodel.attributes);
    consumePipeline = consumepipeliner.consumePipeline(datamodel);
    var disconnectEvent = datamodel.delivery + "_" + datamodel.email + "_" +
        datamodel.name + "_disconnect";
>>>>>>> 0bca1e56b107009b44e01b0d2ff53b179b7170af
    socket.on(disconnectEvent, function(msg) {
        tickerObj.stop(function() {
            globalactivedatasources.unregisterDataSource(datamodel);
        })
    })
    process.nextTick(function() {
<<<<<<< HEAD
        highland(generatorFunc).pipe(genPipeline).pipe(consumePipeline).each(function(data) {
            //console.log("done", data);
            if (cb) cb(data);
        })
=======
        highland(generatorFunc).pipe(genPipeline).pipe(consumePipeline).each(
            function(data) {
                //console.log("done", data);
                if (cb) cb(data);
            })
>>>>>>> 0bca1e56b107009b44e01b0d2ff53b179b7170af
    })
}



// generate a ticker object
function getTicker(datamodel) {
    var mode = 'burst';
    var interval = 0;
    var end = null;
    var unit = {
        "mm": 60000,
        "ss": 1000,
        "hh": 3600000,
    }
    if (datamodel.delivery == "download") {
        interval = 1;
    } else if (datamodel.delivery == 'feed') {
        end = new Date(datamodel['datafeed']['end']);
        if (datamodel['datafeed']['flow']['type'] == 'sporadic') {
            interval = datamodel['datafeed']['flow']['bursts']['occurrences'];
        } else if (datamodel['datafeed']['flow']['type'] == 'continuous') {
            mode = 'continuous';
<<<<<<< HEAD
            interval = datamodel['datafeed']['flow']['frequency']['time'] * unit[datamodel['datafeed']['flow']['frequency']['unit']];
        }
    }
    return new ticker(datamodel.name + "_" + datamodel.email, null, end, mode, interval)
=======
            interval = datamodel['datafeed']['flow']['frequency']['time'] * unit[
                datamodel['datafeed']['flow']['frequency']['unit']];
        }
    }
    return new ticker(datamodel.name + "_" + datamodel.email, null, end, mode,
        interval)
>>>>>>> 0bca1e56b107009b44e01b0d2ff53b179b7170af
}
// generate a generator function for highland
function getGeneratorFunc(datamodel, tickerObj) {
    var packets = undefined;
    if (datamodel.delivery == "download") {
        packets = datamodel["download"]["packets"]
    } else if (datamodel.delivery == 'feed') {
        if (datamodel['datafeed']['flow']['type'] == 'sporadic') {
<<<<<<< HEAD
            packets = datamodel['datafeed']['flow']['bursts']['totalpackets'] / datamodel['datafeed']['flow']['bursts']['occurrences'];
        } else if (datamodel['datafeed']['flow']['type'] == 'continuous') {
            packets = datamodel['datafeed']['flow']['frequency']['packets'];
        }
    }

    return function(push, next) {
        tickerObj.start(function() {
            for (var i = 0; i < packets; i++) {
                push(null, {});
            }
            if (datamodel.delivery == 'download') {
                console.log("this is download type")
                push(null, null)
                push(null, highland.nil)
            }
        }, function() {
            globalactivedatasources.unregisterDataSource(datamodel);
        })
    }
=======
            packets = datamodel['datafeed']['flow']['bursts']['totalpackets'] /
                datamodel['datafeed']['flow']['bursts']['occurrences'];
        } else if (datamodel['datafeed']['flow']['type'] == 'continuous') {
            packets = datamodel['datafeed']['flow']['frequency']['packets'];
        }
    }

    return function(push, next) {
        tickerObj.start(function() {
            for (var i = 0; i < packets; i++) {
                push(null, {});
            }
            if (datamodel.delivery == 'download') {
                console.log("this is download type")
                push(null, null)
                push(null, highland.nil)
            }
        }, function() {
            globalactivedatasources.unregisterDataSource(datamodel);
        })
    }
}

//Calculates the number of packets for the specified pattern 
function getPatternGeneratorFunc(datamodel, patternObj, patternMix, tickerObj) {
    var packets = undefined;

    //Calculates, total number of packets for entire datamodel
    if (datamodel.delivery == "download") {
        packets = datamodel["download"]["packets"]
    } else if (datamodel.delivery == 'feed') {
        if (datamodel['datafeed']['flow']['type'] == 'sporadic') {
            packets = datamodel['datafeed']['flow']['bursts']['totalpackets'] /
                datamodel['datafeed']['flow']['bursts']['occurrences'];
        } else if (datamodel['datafeed']['flow']['type'] == 'continuous') {
            packets = datamodel['datafeed']['flow']['frequency']['packets'];
        }
    }

    //Formula to calculate the %age of packets for the specified pattern based on its mix size
    patternPacketSize = (packets * (patternMix / 100));

    return function(push, next) {
        tickerObj.start(function() {
            for (var i = 0; i < packets; i++) {
                push(null, {});
            }
            if (datamodel.delivery == 'download') {
                console.log("this is download type")
                push(null, null)
                push(null, highland.nil)
            }
        }, function() {
            globalactivedatasources.unregisterDataSource(datamodel);
        })
    }
>>>>>>> 0bca1e56b107009b44e01b0d2ff53b179b7170af
}

module.exports = {
    startGeneration: startGeneration
}
