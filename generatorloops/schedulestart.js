var datamodelschema = require('../datamillserver/datamodel/datamodel');
var ticker = require('../generatorapp/timeticker/timeticker');
var generator = require('../generatorapp/generator');
var fulldatamodel = require('../datamillserver/datamodel/datamodelProcessor').getfulldatamodel;
var globalactivedatasources = require('../generatorloops/activedatasrc');

function scheduledatasource() {
  var date = new Date();
  var tickerObj = ticker('outsource', null, null, 'continuous', 2000)
  tickerObj.start(function() {
    datamodelschema.find({ 'delivery': "feed" }, function(err, docs) {
      docs.forEach(function(data) {
        if (data.status != "active") {
          if (data.datafeed.start.getTime() <= (date.getTime()) && data.datafeed.end.getTime() > date.getTime()) {
            fulldatamodel(data.email, data.name, function(code, datamodel) {
              console.log("we are start generating");
              globalactivedatasources.registerDataSource(datamodel);
              setTimeout(function() { generator.startGeneration(datamodel) }, 2000);
              datamodelschema.findOneAndUpdate({ name: data.name, email: data.email }, { $set: { status: 'active' } }, function(err, doc) {
                if (err) { console.log("error in pasting datamodel in generate loop") } else {
                  console.log("scheduledatasource updated");
                }
              });
            }, function(code, err) {
              console.log("getting error");
              //@TODO handle it
            });
          }
        }
      });
    });
  });
}

module.exports = {
  scheduledatasource: scheduledatasource
}
