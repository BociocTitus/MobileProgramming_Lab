/**
 * Created by Titus on 12/27/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
    socketServer = require('../update-server');
socketServer.getServer();
var broadcast = socketServer.changeOccured;
exports.list_all_Orders = function(req, res) {
    console.log("listAllOrders called");
    Order.find({}, function(err, order) {
        if (err)
            res.send(err);
        res.json(order);
    });
};

exports.create_a_Order = function(req, res) {
    console.log("create order called");
    var new_Order = new Order(req.body);
    new_Order.save(function(err, order) {
        if (err)
            res.send(err);
        res.json({ message: 'Order successfully added' });
        broadcast("CREATED", order);
    });
};

exports.merge = function(req, res){
    console.log('Merge called');
    var orders = JSON.parse(req.body.array);
    if(orders.length !== 0 ){
        for(var i=0;i<orders.length;i++){
            if(orders[i].state === 'DELETED'){
                Order.remove({
                    _id: orders[i]._id
                }, function(err, order) {
                });
            }
            if(orders[i].state === 'UPDATED'){
                Order.findOneAndUpdate(
                    {_id: orders[i].order._id}, orders[i].order, {new: true}, function(err, order) {
                        if(err){
                            throw err;
                        }
                    });
            }
            if(orders[i].state === 'CREATED'){
                var new_Order = new Order(orders[i].order);
                new_Order.save(function(err, order) {
                    if (err)
                        throw err;
                });
            }
        }
    }
};

exports.read_a_Order = function(req, res) {
    Order.findById(req.params.orderId, function(err, order) {
        if (err)
            res.send(err);
        res.json(order);
    });
};

exports.update_a_Order = function(req, res) {
    console.log("update order called");
    Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true}, function(err, order) {
        if (err)
            res.send(err);
        res.json({ message: 'Order successfully updated' });
        broadcast("UPDATED", order);
    });
};


exports.delete_a_Order = function(req, res) {
    console.log("delete Order called");
    Order.remove({
        _id: req.params.orderId
    }, function(err, order) {
        if (err)
            res.send(err);
        res.json({ message: 'Order successfully deleted' });
        broadcast("DELETED", req.params.orderId);
    });
};