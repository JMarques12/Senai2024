const mysql = require("mysql");

const connect = mysql.createConnection({
    user: "root",
    //password: "ROOT",
    host: "localhost",
    database: "manutencoes"
})

module.exports = connect;
