var io = require('socket.io')();
var generator = require('./datamillserver/generator/generator');
var redis = require('redis')
console.log("socket file entered");
io.on('connection', function(socket) {
  console.log("subscribing to client");
  var redisClient = new redis.createClient();
  socket.on("subscribe", function() {
    redisClient.subscribe('data', function(data) {
      emitterEventName = data.name + '_' + data.email;
      socket.emit(emitterEventName, data.data)
    })
  })
  socket.on("download", function(datamodel) {
    redisClient.subscribe('download', function(data) {
      emitterEventName = data.name + '_' + data.email;
      socket.emit(emitterEventName, data.data)
    })
  })
  socket.on("disconnect", function() {
    redisClient.unsubscribe();
  })
  console.log("request on socket", socket.request.headers);
});

module.exports = io;
