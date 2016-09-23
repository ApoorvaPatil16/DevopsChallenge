var io = require('socket.io')();
var redis = require('redis')
var generator = require('./generatorapp/generator')
console.log("socket file entered");
io.on('connection', function(socket) {
  //console.log("subscribing to client");
  var redisClient = new redis.createClient();
  socket.on("subscribe", function() {
    redisClient.subscribe('data', function(data) {
      emitterEventName = "feed_" + data.email + '_' + data.name;
      socket.emit(emitterEventName, data.data)
    })
  })
  io.on('downloader', function(data) {
    console.log("catch the fire")
    emitterEventName = "download_" + data.email + '_' + data.name;
    socket.emit(emitterEventName, data.data)
  })
  socket.on("download", function(datamodel) {
    datamodel = JSON.parse(datamodel)
    generator.startGeneration(datamodel)
      /*redisClient.subscribe('download', function(data) {
  console.log("getting the data in redis subscribe", data);
  data = JSON.parse(data)
  emitterEventName = "download_" + data.email + '_' + data.name;
  socket.emit(emitterEventName, data.data)
})
*/
  })
  socket.on("disconnect", function() {
      redisClient.unsubscribe();
    })
    //console.log("request on socket", socket.request.headers);
});

module.exports = io;
