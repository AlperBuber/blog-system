const mysql = require("mysql2");
const config = require("../config/database")
let connection = mysql.createConnection(config.db);

connection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("mysqle bağlanıldı")
    }
    
})


module.exports = connection.promise();