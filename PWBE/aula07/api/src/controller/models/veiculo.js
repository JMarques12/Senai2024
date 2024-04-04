const CRUD = require("../CRUD");

const table = "veiculo";

const queries = (data={}) => {
    return {
        getAll: `SELECT * FROM ${table}`,
        get: `SELECT * FROM ${table} WHERE placa = '${data.placa}'`,
        create: `INSERT INTO ${table} VALUE (
            '${data.placa}', 
            '${data.modelo}',
            '${data.marca}',
            '${data.ano}'
        )`,
        update: `UPDATE ${table} SET
            modelo = '${data.modelo}',
            marca = '${data.marca}',
            ano = '${data.ano}'
            WHERE placa = '${data.placa}'`,
        delete: `DELETE FROM ${table} WHERE placa = '${data.placa}'`
    }
}

class Veiculo extends CRUD {
    constructor(queries) {
        super(queries);
    }
}

const veiculo = new Veiculo(queries);
module.exports = veiculo;
