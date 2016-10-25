var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ host: '0.0.0.0', port: 3000 });
var redis = require('redis');
var appconf = require('./appconf');

wss.on('connection', function connection(ws) {
    console.log("Got new connection ");

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    var redisClient = new redis.createClient(appconf.REDIS_PORT, appconf.REDIS_HOST);
    redisClient.subscribe('feed');
    redisClient.on('message', function(channel, dataStr) {
        // var data = JSON.parse(dataStr);
        ws.send(dataStr);
    });

    ws.on('close', function() {
        redisClient.unsubscribe();
        console.log('closing connection');
    });

    ws.on('error', function(err) {
        console.log("Error occurred: ", err);
    });

    // redisClient.unsubscribe();
});
