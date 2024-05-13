const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    database : 'computer_comp'
});

//check if connection is ok

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
});


//db check tables

connection.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error;
    //for evry table in the db show the table name and the fields
    results.forEach((table) => {
        console.log('Table: ' + table.Tables_in_computer_comp);
    });
});

module.exports = connection;
