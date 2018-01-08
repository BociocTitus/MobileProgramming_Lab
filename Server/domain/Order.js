/**
 * Created by Titus on 12/27/2017.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: function () { return new mongoose.Types.ObjectId()}
    },
    food: {
        type: String,
        required: 'Food required'
    },
    price: {
        type: String,
        default: 'Price required'
    },
    orderType: {
        type: [{
            type: String,
            enum: ['togo', 'here']
        }],
        default: ['here']
    }},
    {
    versionKey: false
});

module.exports = mongoose.model('Order', OrderSchema);