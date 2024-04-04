const connect = require("../../connect/connect");
const CRUD = require("../CRUD");

const table = "funcionario";
const phone_table = "telefone";

const queries = (data={}) => {
    return {
        getAll: `SELECT * FROM ${table}`,
        get: `SELECT * FROM ${table} WHERE matricula = ${data.matricula}`,
        create: `INSERT INTO ${table} VALUE (${data.matricula}, '${data.nome}')`,
        update: `UPDATE ${table} SET
            nome = '${data.nome}'
            WHERE matricula = ${data.matricula}`,
        delete: `DELETE FROM ${table} WHERE matricula = ${data.matricula}`,

        getPhone: `SELECT * FROM ${phone_table} WHERE matricula = ${data.matricula}`, 
        addPhone: `INSERT INTO ${phone_table} VALUE (${data.matricula}, '${data.telefone}')`,
        deletePhone: `DELETE FROM ${phone_table} WHERE matricula = ${data.matricula}`,
    }
}

class Funcionario extends CRUD {
    constructor(queries) {
        super(queries);
        this.queries = queries;
    }

    getPhone = (req, res) => {
        const data = { ...req.params };
        connect.query(this.queries(data).getPhone, (err, result) => {
            if (err) res.status(404).json(err).end();
            else res.status(202).json(result).end();
        });
    }

    addPhone = (req, res) => {
        const data = { ...req.params, ...req.body };
        connect.query(this.queries(data).addPhone, (err, result) => {
            if (err) res.status(400).json(err).end();
            else {
                const newPhone = { matricula: data.matricula, ...req.body };
                res.status(201).json(newPhone).end();
            }
        });
    }

    deletePhone = (req, res) => {
        const data = { ...req.params };
        connect.query(this.queries(data).deletePhone, (err, result) => {
            if (err) res.status(404).json(err).end();
            else {
                if (result.affectedRows > 0) res.status(202).json(result).end();
                else {
                    result.message = "Matricula not found";
                    res.status(404).json(result).end();
                }
            }
        });
    }
}

const funcionario = new Funcionario(queries);
module.exports = funcionario;
