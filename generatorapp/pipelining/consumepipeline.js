var highland = require('highland');
var redis = require('redis');
var io = require('socket.io');

function consumePipeline(datamodel) {
  var myConsumepipe = [];
  var publishdata = {
    name: datamodel.name,
    email: datamodel.email,
    data: undefined
  };

  var redisClient = new redis.createClient();
  if (datamodel.delivery == 'download') {
    myConsumepipe.push(highland.map(function(data) {
      publishdata.data = data;
      redisClient.publish("download", JSON.stringify(publishdata))
      return data;
    }))
  }
  if (datamodel.delivery == 'feed') {
    myConsumepipe.push(highland.map(function(data) {
      publishdata.data = data;
      redisClient.publish("data", JSON.stringify(publishdata))
      return data;
    }))
  }
  return highland.pipeline.apply(null, myConsumepipe);
}

module.exports = {
  consumePipeline: consumePipeline
}
