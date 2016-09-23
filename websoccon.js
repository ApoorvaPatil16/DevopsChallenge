var io = require('socket.io')();
var redis = require('redis')
var generator = require('./generatorapp/generator')
console.log("socket file entered");
io.on('connection', function(socket) {
  console.log("subscribing to client");
  var redisClient = new redis.createClient();
  socket.on("subscribe", function(msg) {
    redisClient.subscribe('feed')
    redisClient.on('message', function(channel, dataStr) {
      var data = JSON.parse(dataStr)
      emitterEventName = channel + "_" + data.email + '_' + data.name;
      socket.emit(emitterEventName, data.data)
    })
  })
  socket.on("download", function(datamodel) {
    datamodel = JSON.parse(datamodel)
    generator.startGeneration(datamodel)
    redisClient.subscribe('download')
    redisClient.on('message', function(channel, dataStr) {
      var data = JSON.parse(data)
      console.log("getting the data in redis subscribe")
      emitterEventName = channel + "_" + data.email + '_' + data.name;
      socket.emit(emitterEventName, data.data)
    })
  })
  socket.on("disconnect", function() {
    redisClient.unsubscribe();
  })
  console.log("request on socket", socket.request.headers);
});

module.exports = io;
