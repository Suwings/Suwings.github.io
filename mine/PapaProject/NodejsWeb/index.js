var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toortoor',
    database: 'papapa'
});

connection.connect();

connection.query('select * from news_a1', function (error, results, fields) {
    if (error) throw error;
    console.log(results)
});