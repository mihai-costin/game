var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../config');

module.exports.register = function (req, res) {
    var encryptedString = cryptr.encrypt(req.body.password);
    var sql = "INSERT INTO players SET ?";
    var users = {
        id: 1,    
        name: req.body.username,
        password: encryptedString,
        email: req.body.email,
        score: 0
    };

    connection.query(sql, users, function (error, results, fields) {
        if (error) {
            console.log(error.message);
            console.log(users);
            //console.log(users.password);
            res.json({
                status: false,
                message: 'there are some error with query'
            });
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            });
        }
    });
}
