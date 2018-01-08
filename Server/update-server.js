/**
 * Created by Titus on 1/3/2018.
 */
ws = require("nodejs-websocket");
var socketServer;
function initSocketServer(){
    console.log("Creating socket server");
    socketServer = ws.createServer(function(conn){
        console.log("New connection");
        conn.on("text", function (str) {
            console.log("Received "+str);
            conn.sendText(str.toUpperCase()+"!!!")
        });
        conn.on("close", function (code, reason) {
            console.log("Connection closed")
        })
    }).listen(8001);
}

exports.getServer = function (){
    if(socketServer === undefined){
        initSocketServer();
    }
    return socketServer;
};
exports.changeOccured = function(operation, order) {
    var msg = JSON.stringify({
        operation: operation,
        order: order
    });
    socketServer.connections.forEach(function(conn) {
        conn.sendText(msg)
    });
};