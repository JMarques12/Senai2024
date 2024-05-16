const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Função para criar um novo ponto turístico
async function criarPontoTuristico(nome, endereco, telefone, valor) {
    try {
        const pontoTuristico = await prisma.pontoTuristico.create({
            data: {
                nome,
                endereco,
                telefone,
                valor
            }
        });
        return pontoTuristico;
    } catch (error) {
        throw new Error(`Erro ao criar ponto turístico: ${error.message}`);
    }
}

// Função para listar todos os pontos turísticos
async function listarPontosTuristicos() {
    try {
        const pontosTuristicos = await prisma.pontoTuristico.findMany();
        return pontosTuristicos;
    } catch (error) {
        throw new Error(`Erro ao listar pontos turísticos: ${error.message}`);
    }
}

module.exports = {
    criarPontoTuristico,
    listarPontosTuristicos
};