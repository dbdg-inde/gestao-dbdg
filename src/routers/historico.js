const express = require("express");
const Historico = require("./../models/historico");
const router = express.Router();
const auth = require("./../middlewares/auth.js");
const permissao = require("./../middlewares/permissao.js");
router.post("/historicos", auth, permissao, async (req, res) => {
  try {
    const historico = new Historico(req.body);
    await historico.save();
    res.status(201).send(historico._id);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.patch("/historicos/:id", auth, permissao, async (req, res) => {
  const attributeNames = Object.keys(req.body); // ["nome", "isAdministrador"]
  try {
    const historico = await Historico.findById(req.params.id);
    if (!historico) return res.status(404).send("Historico não encontrado.");
    attributeNames.forEach(
      (attrName) => (historico[attrName] = req.body[attrName])
    );
    await historico.save();
    res.send(historico);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.get("/historicos", async (req, res) => {
  try {
    const historicos = await Historico.find({});
    res.send(historicos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve algum problema interno no servidor");
  }
});

router.delete("/historicos/:id", auth, permissao, async (req, res) => {
  try {
    const historico = await Historico.findOneAndDelete({ _id: req.params.id });
    if (!historico) return res.status(404).send("Histórico não encontrado.");
    res.send(historico);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
