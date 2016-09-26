var datamodelschema = require('../datamillserver/datamodel');
var ticker = require('../generatorapp/timeticker/timeticker');
var generator = require('./generatorapp/generator')

function scheduledatasource() {
    var date = new Date();
    var tickerObj = ticker('outsource', null, null, 'continuous', 10)
    tickerObj.start(function() {
        datamodelschema.find({ 'delivery': "feed" }, function(err, docs) {

            docs.forEach(function(data) {
                if (data.status != "active") {
                    if (data.datafeed.start.getTime() >= (date.getTime())) {
                        generator.startGeneration(datamodel);
                        datamodelschema.findOneAndUpdate({ name: data.name, email: data.email }, data, function(err, doc) {
                        	if(err) {console.log("error in pasting datamodel in generate loop",)}
                        	else {
                        		console.log("scheduledatasource updated");
                        	}	
                        });
                    }
                }
            });
        });
    });
}

