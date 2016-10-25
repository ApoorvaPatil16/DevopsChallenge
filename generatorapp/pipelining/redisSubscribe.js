var redisClient = require('./passdatasource');

function getRealData(sourcename, email, cb) {
    // console.log(redisClient.client.lpop());	
    // console.log(client.lrange("First names",0,0));
    console.log("inside redis subscribe");
    redisClient.client.lpop(sourcename + "_" + email, function(err, data) {
        cb(data);
    });
}
module.exports = {
    getRealData: getRealData
};
