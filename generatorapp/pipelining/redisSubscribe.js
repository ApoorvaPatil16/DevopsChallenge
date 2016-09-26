var redis = require('redis');
var redisClient = require('./passdatasource');

function getRealData(sourcename, email, cb) {
  // console.log(redisClient.client.lpop());	
  // console.log(client.lrange("First names",0,0));
  redisClient.client.lpop(sourcename + "_" + email, function(err, data) {
    console.log("ketan:", data);
    cb(data);
  });
}
module.exports = {
  getRealData: getRealData
};
