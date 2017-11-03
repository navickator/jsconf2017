var mysql = require('mysql');
var config = require("../config.js");

/**
 * Database connection
 */
class Database {
    constructor(){
        this.connection = mysql.createConnection({
            host     : config.db.server,
            user     : config.db.user,
            password : config.db.password,
            database : config.db.database
        });

        this.connection.connect();
    }
}
module.exports = Database;