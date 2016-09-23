var redis=require('redis');
var redisClient=require('./passdatasource');
function getRealData(cb) {
	// console.log(redisClient.client.lpop());	
	// console.log(client.lrange("First names",0,0));
	redisClient.client.lpop("First name",function(err,data){
		console.log("ketan:",data);
		return cb(data);
	});
}
module.exports={
	getRealData:getRealData
};
