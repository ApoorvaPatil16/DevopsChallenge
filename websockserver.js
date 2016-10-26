var WebSocketServer = require('ws').Server;
var redis = require('redis');
var appconf = require('./appconf');

var datamillWSServer = function(wsHost, wsPort) {
    console.log("Started Web socket serve for data feed..!");

    var wss = new WebSocketServer({
        host: wsHost || '0.0.0.0',
        port: wsPort || 3000
    });

    wss.on('connection', function connection(ws) {
        console.log("Got new connection ");

        /*ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });*/

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

}

module.exports = datamillWSServer;
