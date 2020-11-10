const express = require("express");
const router = express.Router();
//const auth = require("./../middlewares/auth.js");
//const permissao = require("./../middlewares/permissao.js");
const wmsCapabilities = require("./../ogc/WMSCapabilities");
const fetch = require("node-fetch");

//const auth = require("./../middlewares/auth.js");
router.get("/wms/catalogos", async (req, res) => {
  try {
    let result = await fetch("https://inde.gov.br/api/catalogo/get");
    console.log(result);
    return res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve algum problema interno no servidor");
  }
});
router.get("/wms/catalogos/:url([0-9a-z./:]+)", async (req, res) => {
  try {
    console.log("ENTREI URL");
    result = await fetch(req.params.url);
    return res.send(await result.json());
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve algum problema interno no servidor");
  }
});
module.exports = router;
