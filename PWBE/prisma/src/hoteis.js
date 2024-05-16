const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Função para criar um novo hotel
async function criarHotel(nome, valor, avaliacao, email, site) {
    try {
        const hotel = await prisma.hotel.create({
            data: {
                nome,
                valor,
                avaliacao,
                email,
                site
            }
        });
        return hotel;
    } catch (error) {
        throw new Error(`Erro ao criar hotel: ${error.message}`);
    }
}

// Função para listar todos os hotéis
async function listarHoteis() {
    try {
        const hoteis = await prisma.hotel.findMany();
        return hoteis;
    } catch (error) {
        throw new Error(`Erro ao listar hotéis: ${error.message}`);
    }
}

module.exports = {
    criarHotel,
    listarHoteis
};