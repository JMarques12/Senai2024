const connect = require("../connect/connect");

class CRUD {
    constructor(queries) {
        this.queries = queries;
    }

    getAll = (req, res) => {
        connect.query(this.queries().getAll, (err, result) => {
            if (err) res.status(404).json(err).end();
            else res.status(202).json(result).end();
        });
    }

    get = (req, res) => {
        const data = { ...req.params };
        connect.query(this.queries(data).get, (err, result) => {
            if (err) res.status(404).json(err).end();
            else res.status(202).json(result).end();
        });
    }

    create = (req, res) => {
        const data = { ...req.body };
        connect.query(this.queries(data).create, (err, result) => {
            if (err) res.status(400).json(err).end();
            else {
                const newItem = req.body;
                res.status(201).json(newItem).end();
            }
        });
    }

    update = (req, res) => {
        const data = { ...req.params, ...req.body };
        connect.query(this.queries(data).update, (err, result) => {
            if (err) res.status(400).json(err).end();
            else {
                if (result.affectedRows > 0) {
                    res.status(202).json(req.body).end();
                } else {
                    res.status(404).json(err).end();
                }
            }
        });
    }

    deleteData = (req, res) => {
        const data = { ...req.params };
        connect.query(this.queries(data).delete, (err, result) => {
            if (err) res.status(404).json(err).end();
            else {
                if (result.affectedRows > 0) {
                    res.status(202).json(result).end();
                } else {
                    result.message = "ID not found";
                    res.status(404).json(result).end();
                }
            }
        });
    }
}

module.exports = CRUD;
