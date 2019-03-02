var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../config');

module.exports.authenticate = function (req, res) {
    var user = req.body.username;
    var password = req.body.password;

    connection.query('SELECT * FROM players WHERE name = ?', [user], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {

            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    res.json({
                        status: true,
                        message: 'successfully authenticated'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Username and password does not match"
                    });
                }

            } else {
                res.json({
                    status: false,
                    message: "Username does not exits"
                });
            }
        }
    });
}