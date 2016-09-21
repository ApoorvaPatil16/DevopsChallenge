var io = require('socket.io')();
var generator = require('./datamillserver/generator/generator');
console.log("sockett file entered");
io.on('connection', function(socket) {
  console.log("subscribing to client");
  console.log("request on socket", socket.request.headers);
});

module.exports = io;
