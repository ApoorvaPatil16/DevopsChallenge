var redis=require('redis');
var redisClient=require('./passdatasource');
function getRealData(sourcename) {
	return(redisClient.client.lpop());	
}

