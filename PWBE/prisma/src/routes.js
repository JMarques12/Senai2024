const express = require('express');
const destino = require('./destino');
const pontoturistico = require('./pontoturistico');
const hoteis = require('./hoteis');

const router = express.Router();


router.post('/destinos', async (req, res) => {
    const { nome, valor, data } = req.body;
    try {
        const novoDestino = await destino.criarDestino(nome, valor, data);
        res.status(201).json(novoDestino);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/destinos', async (req, res) => {
    try {
        const destinos = await destino.listarDestinos();
        res.status(200).json(destinos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/pontosturisticos', async (req, res) => {
    const { nome, endereco, telefone, valor } = req.body;
    try {
        const novoPontoTuristico = await pontoturistico.criarPontoTuristico(nome, endereco, telefone, valor);
        res.status(201).json(novoPontoTuristico);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/pontosturisticos', async (req, res) => {
    try {
        const pontosTuristicos = await pontoturistico.listarPontosTuristicos();
        res.status(200).json(pontosTuristicos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/hoteis', async (req, res) => {
    const { nome, valor, avaliacao, email, site } = req.body;
    try {
        const novoHotel = await hoteis.criarHotel(nome, valor, avaliacao, email, site);
        res.status(201).json(novoHotel);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/hoteis', async (req, res) => {
    try {
        const hoteisListados = await hoteis.listarHoteis();
        res.status(200).json(hoteisListados);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;