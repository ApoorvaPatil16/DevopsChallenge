var highland = require('highland');
var redis = require('redis');
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8080/');

function consumePipeline(datamodel) {
  var myConsumepipe = [];

  var redisClient = new redis.createClient();

  if (datamodel.delivery == 'download') {
    myConsumepipe.push(highland.map(function(data) {
      var publishdata = {
        name: datamodel.name,
        email: datamodel.email,
        data: null
      };
      if (data == null) {
        console.log("get null")
      }
      publishdata.data = data;
      //console.log("we are publishing data:", publishdata, "and original data:", data)
      redisClient.publish("download", JSON.stringify(publishdata))
      return data;
    }))
  }
  if (datamodel.delivery == 'feed') {
    myConsumepipe.push(highland.map(function(data) {
      var publishdata = {
        name: datamodel.name,
        email: datamodel.email,
        data: undefined
      };
      publishdata.data = data;
      redisClient.publish("feed", JSON.stringify(publishdata))
      return data;
    }))
  }
  return highland.pipeline.apply(null, myConsumepipe);
}

module.exports = {
  consumePipeline: consumePipeline
}
