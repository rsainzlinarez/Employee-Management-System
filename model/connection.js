const mysql = require('mysql');



var connection = mysql.createConnection({
host: "localhost",

port: 3306,

user: "root",

password: "yourRootPassword",

database: "employee_trackerDB"

});

module.exports = connection;