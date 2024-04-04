const CRUD = require("../CRUD");

const table = "manutencao";

const queries = (data={}) => {
    return {
        getAll: `SELECT * FROM ${table}`,
        get: `SELECT * FROM ${table} WHERE id = ${data.id}`,
        create: `INSERT INTO ${table}(placa, matricula, inicio, fim, descricao) VALUE (
            '${data.placa}', 
            '${data.matricula}',
            '${data.inicio}',
            '${data.fim}',
            '${data.descricao}'
        )`,
        update: `UPDATE ${table} SET
            placa = '${data.placa}',
            matricula = '${data.matricula}',
            inicio = '${data.inicio}',
            fim = '${data.fim}',
            descricao = '${data.descricao}'
            WHERE id = ${data.id}`,
        delete: `DELETE FROM ${table} WHERE id = ${data.id}`
    }
}

class Manutencao extends CRUD {
    constructor(queries) {
        super(queries);
    }
}

const manutencao = new Manutencao(queries);
module.exports = manutencao;

