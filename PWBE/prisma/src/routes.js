const express = require('express');
const destino = require('./destino');
const pontoturistico = require('./pontoturistico');
const hoteis = require('./hoteis');

const router = express.Router();

//Routes Destino
router.get('/destino', destino.read);
router.post('/destino', destino.create);
router.put('/destino/:id', destino.update);
router.delete('/destino/:id', destino.del);

//Routes Hoteis
router.get('/hoteis', hoteis.read);
router.post('/hoteis', hoteis.create);
router.put('/hoteis/:id', hoteis.update);
router.delete('/hoteis/:id', hoteis.del);

//Routes Pontos_Turisticos
router.get('/pontos_turisticos', pontoturistico.read);
router.post('/pontos_turisticos', pontoturistico.create);
router.put('/pontos_turisticos/:id', pontoturistico.update);
router.delete('/pontos_turisticos/:id', pontoturistico.del);


module.exports = router;