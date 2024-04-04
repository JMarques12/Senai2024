const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'transportadora'
});

const teste = (req, res) => {
    res.send("Back-end da transportadora respondendo");
}

const create = (req, res) => {