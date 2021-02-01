const express = require("express");
const router = express.Router();
//const auth = require("./../middlewares/auth.js");
//const permissao = require("./../middlewares/permissao.js");
//const wmsCapabilities = require("./../ogc/WMSCapabilities");
const fetch = require("node-fetch");

//const auth = require("./../middlewares/auth.js");
router.get("/wms/catalogos", async (req, res) => {
  try {
    let result = await fetch("https://inde.gov.br/api/catalogo/get");
    const aJson = await result.json()
    console.log(aJson);
    return res.send(aJson);
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve algum problema interno no servidor");
  }
});
router.get("/wms/catalogos/:url([0-9a-z./:]+)", async (req, res) => {
  try {
    console.log(`ENTREI URL: ${req.params.url}`);
    const a_url = req.params.url + '?service=wms&request=getCapabilities'
    result = await fetch(a_url);
    res.type('application/xml');
    const res_xml = await result.text();
    return res.send(res_xml);
      
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve algum problema interno no servidor");
  }
});
module.exports = router;
