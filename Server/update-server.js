/**
 * Created by Titus on 1/3/2018.
 */
ws = require("nodejs-websocket");
let Expo = require('expo-server-sdk');
let socketServer;
let push_tokens = [];
let messages = [];
let expo = new Expo();
console.log(expo);

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
function sendTokenNotification(token){
    messages.push({
        to: token.value,
        sound:'default',
        body:'Orders updated!',
        data:JSON.stringify({})
    });
}
async function sendChunk(chunk){
    try {
        let receipts = await expo.sendPushNotificationsAsync(chunk).then().catch();
        console.log(receipts);
    } catch (error) {
        console.error(error);
    }
}
exports.getServer = function (){
    if(socketServer === undefined){
        initSocketServer();
    }
    return socketServer;
};
exports.add_token = function(token){
    console.log('Token added:'+JSON.stringify(token));
    push_tokens.push(token);
};
exports.changeOccured = function(operation, order) {
    let msg = JSON.stringify({
        operation: operation,
        order: order
    });
    socketServer.connections.forEach(function(conn) {
        conn.sendText(msg)
    });

    push_tokens.forEach(sendTokenNotification);
    let chunks = expo.chunkPushNotifications(messages);
    chunks.forEach(sendChunk);
    messages = [];
};