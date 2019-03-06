require("dotenv").config();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var table = "SPT_VALUES";
/*columns:
name
number
type
low
high
status
*/
var query = "select table_name from information_schema.tables"; 
var query1 = "select * from spt_fallback_usg"

var config = {
    server: process.env.SQL_SERVER,
    userName: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    options : {
        database: process.env.SQL_DATABASE
    }
}

var connection = new Connection(config);

connection.on('connect', function(err) {
// If no error, then good to go...
    executeStatement();
});

function executeStatement() {
    request = new Request(query, function(err, rowCount) {
        if (err) {
        console.log(err);
        } else {
        console.log(rowCount + ' rows');
        }
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
        console.log(column.value);
        });
    });

    connection.execSql(request);
    }