const express = require("express");
const router = express.Router();

const funcionario = require("../controller/models/funcionario");
const veiculo = require("../controller/models/veiculo");
const manutencao = require("../controller/models/manutencao");

const verifier = (req, res) => {
    res.json("Back-end sucinto");
};

router.get("/", verifier);

router.get("/funcionario", funcionario.getAll);
router.get("/funcionario/:matricula", funcionario.get);
router.post("/funcionario", funcionario.create);
router.put("/funcionario/:matricula", funcionario.update);
router.delete("/funcionario/:matricula", funcionario.deleteData);
// Telefones
router.get("/funcionario/telefone/:matricula", funcionario.getPhone);
router.post("/funcionario/telefone/:matricula", funcionario.addPhone);
router.delete("/funcionario/telefone/:matricula", funcionario.deletePhone);

router.get("/veiculo", veiculo.getAll);
router.get("/veiculo/:placa", veiculo.get);
router.post("/veiculo", veiculo.create);
router.put("/veiculo/:placa", veiculo.update);
router.delete("/veiculo/:placa", veiculo.deleteData);

router.get("/manutencao", manutencao.getAll);
router.get("/manutencao/:id", manutencao.get);
router.post("/manutencao", manutencao.create);
router.put("/manutencao/:id", manutencao.update);
router.delete("/manutencao/:id", manutencao.deleteData);

module.exports = router;