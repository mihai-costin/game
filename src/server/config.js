var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'users'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log(err.message);   
        console.log("Error while connecting with database");
    }
});

module.exports = connection;
