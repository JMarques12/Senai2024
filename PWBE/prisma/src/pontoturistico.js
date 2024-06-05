const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (req, res) => {
    const { data } = req.body;
    const pontos = await prisma.pontoTuristico.create({
        data
    })

    res.status(200).json(pontos).end();
};

const read = async (req, res) => {
    const pontos = await prisma.pontoTuristico.findMany()

    res.status(200).json(pontos).end();
};

const update = async (req, res) => {
    const data = req.body;
    const pontos = await prisma.pontoTuristico.update({
        where: { id: Number(req.params.id) }, data
    })

    res.status(200).json(pontos).end();
}

const del = async (req, res) => {
    const pontos = await prisma.pontoTuristico.delete({
        where: {id: Number(req.params.id)}
    })

    res.status(200).json(pontos).end();
}

module.exports = {
    create,
    read,
    update,
    del
};