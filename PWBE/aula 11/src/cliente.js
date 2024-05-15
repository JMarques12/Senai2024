const {PrismaCliente} = require('@prisma/client');

const prisma = new PrismaCliente();

const create = async (req, res) => {
    const data = req.body;

    console.log(data);

    const cliente = await prisma.clientes.create()
}

module.exports =router; 
   

