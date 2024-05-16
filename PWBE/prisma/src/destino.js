const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Função para criar um novo destino de viagem
async function criarDestino(nome, valor, data) {
    try {
        const destino = await prisma.destino.create({
            data: {
                nome,
                valor,
                data
            }
        });
        return destino;
    } catch (error) {
        throw new Error(`Erro ao criar destino: ${error.message}`);
    }
}

// Função para listar todos os destinos de viagem
async function listarDestinos() {
    try {
        const destinos = await prisma.destino.findMany();
        return destinos;
    } catch (error) {
        throw new Error(`Erro ao listar destinos: ${error.message}`);
    }
}

module.exports = {
    criarDestino,
    listarDestinos
};