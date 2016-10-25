var redis = require('redis');
var appconf = require('../../appconf');
var importsourceModel = require('../../datamillserver/datasource/importdataSchema');
var client = redis.createClient(appconf.REDIS_PORT, appconf.REDIS_HOST);

function passdatasource(sourcename, email, balancer) {
    //console.log("inside passdatasource");
    console.log("source name is ", sourcename);
    importsourceModel.find({ sourcename: sourcename, email: email }, function(err, docs) {
        if (err) {
            console.log("error in passdatasource in fetching data from datasource");
            console.log(err);
        } else {
            //console.log("success callback from passdatasource");
            var data = docs[0].data;
            for (i = 0; i < balancer; i++) {
                var randomvalue = Math.floor(Math.random() * (data.length));
                var keys = Object.keys(data[0]);
                if (data[randomvalue][keys[0]])
                    client.lpush(sourcename + "_" + email, data[randomvalue][keys[0]]);
            }
        }
    });
}
module.exports = {
    passdatasource: passdatasource,
    client: client
};
