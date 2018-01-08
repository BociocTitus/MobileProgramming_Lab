/**
 * Created by Titus on 12/27/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
        _id: {
            type: Schema.Types.ObjectId,
            default: function () { return new mongoose.Types.ObjectId()}
        },
        username: {
            type: String,
            required: 'Food required'
        },
        hashPassword: {
            type: String,
            default: 'Price required'
        },
        role: {
            type: [{
                type: String,
                enum: ['admin', 'normal']
            }],
            default: ['normal']
        }
    },
        {
            versionKey: false
        }
);
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hashPassword);
}

module.exports = mongoose.model('User', UserSchema);