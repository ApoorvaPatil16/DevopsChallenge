var redis = require('redis');
var importsourceModel = require('../../datamillserver/datasource/importdataSchema');
var client = redis.createClient();

function passdatasource(sourcename, email) {
    console.log("inside passdatasource");
    importsourceModel.find({ sourcename: sourcename, email: email }, function(err, docs) {
        if (err) {
            console.log("error in passdatasource in fetching data from datasource");
            console.log(err)
        } else {
            console.log("success callback from passdatasource");
            var data = docs[0].data;
            for (i = 0; i < 20; i++) {
                var randomvalue = Math.floor(Math.random() * (data.length));
                client.lpush(sourcename, data[randomvalue].firstname);
            }
            // client.lindex(sourcename,13,function(err,obj){
            // 	console.log(obj);
            // });
            // client.publish('realData',lpush);
        }
    });
}
module.exports = {
    passdatasource: passdatasource,
    client: client
};
