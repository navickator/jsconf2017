var Database = require("./database.controller");

class Register extends Database {
    constructor() {
        super();
    }

    isValidCode(code) {
        code = code || "";
        var connection = this.connection;

        if (code == "") {
            return false;
        }

        //code = this.connection.escape(code);
        return new Promise(function (resolve, reject) {
            connection.query("SELECT COUNT(*) AS valid FROM register_codes WHERE code=? AND activated=0", [code], function (error, result, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0].valid == 0 ? false : true);
                }
            });
        })
    }

    activateCode(code) {
        var connection = this.connection;
        return new Promise(function (resolve, reject) {
            connection.query("UPDATE register_codes SET activated=1 WHERE code=?", [code], function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result);
                }
            })
        })
    }

    registerUser(data) {
        var connection = this.connection;
        var params = [
            data.name,
            data.email,
            data.profileUrl,
            data.code
        ];

        return new Promise(function (resolve, reject) {
            connection.query("INSERT INTO register_users SET name=?, email=?, linkedin=?,  register_code=?", params, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result);
                }
            })
        })
    }

    getRegistrations() {
        var connection = this.connection;

        return new Promise(function (resolve, reject) {
            connection.query("SELECT name, register_code AS code FROM register_users", function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = Register;