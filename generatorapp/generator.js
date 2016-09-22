var ticker = require('./timeticker/timeticker');
var highland = require('highland')

function startGeneration(datamodel) {
  tickerObj = getTicker(datamodel)
  generatorFunc = getGeneratorFunc(datamodel)
  genPipeline = getGenPipeline(datamodel)
  consumePipeline = getConsumePipeline(datamodel)
  process.nexttick(function() {
    highland(generatorFunc).pipe(genPipeline).pipe(consumePipeline).each(function(data) {
      console.log("done");
    })
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
      interval = datamodel['datafeed']['flow']['frequency']['time'] * unit[datamodel['datafeed']['flow']['frequency']['unit']];
    }
  }
  return new ticker(datamodel.name + "_" + datamodel.email, null, end, mode, interval)
}
// generate a generator function for highland
function getGeneratorFunc(datamodel, tickerObj) {
  var packets = undefined;
  pusherObj = [];
  if (datamodel.delivery == "download") {
    packets = datamodel["download"]["packets"]
  } else if (datamodel.delivery == 'feed') {
    if (datamodel['datafeed']['flow']['type'] == 'sporadic') {
      packets = datamodel['datafeed']['flow']['bursts']['totalpackets'] / datamodel['datafeed']['flow']['bursts']['occurrences'];
    } else if (datamodel['datafeed']['flow']['type'] == 'continuous') {
      packets = datamodel['datafeed']['flow']['frequency']['packets'];
    }
  }
  for (var i = 0; i < packets; i++) {
    pusher.push({})
  }
  return function(push, next) {
    tickerObj.start(function() {
      push(null, pusher);
      if (tickerObj.status != "complete") {
        next();
      }
    })
  }
}
