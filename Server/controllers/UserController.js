/**
 * Created by Titus on 12/27/2017.
 */
'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

exports.register = function(req, res){
    let new_User = new User(req.body);
    new_User.hashPassword = bcrypt.hashSync(req.body.password, 10);
    new_User.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.json(user);
        }
    });
};

exports.sign_in = function(req, res){
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({token: jwt.sign({username: user.username, _id: user._id, role:user.role}, 'RESTFULAPIs'), role: user.role});
            }
        }
    });
};

exports.normal_role_required = function(req, res, next){
    if (req.user.role.indexOf('normal') !== -1 || req.user.role.indexOf('admin') !== -1) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.admin_role_required = function(req , res, next){

    if (req.user.role.indexOf('admin') !== -1) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};