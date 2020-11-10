require("./../src/db/dbMongoose");
const CatalogoServico = require("./../src/models/catalogoServico");
const Ator = require("./../src/models/ator");
const fs = require("fs");
const catalogo = JSON.parse(
  fs.readFileSync(
    "C:\\desenv\\gestao-dbdg\\migracao\\catalogo_servico.json",
    "utf8"
  )
);
function createListaCatalogoServicoFromINDE(item) {
  items = [];

  if (item.wmsAvailable) {
    const url = item.url + "/?service=wms&request=getCapabilities";
    const newItem = CatalogoServico({
      descricao: item.descricao,
      url: url,
      tipo: "WMS",
    });
    items.push(newItem);
  }
  if (item.wfsAvailable) {
    const url = item.url + "/?service=wfs&request=getCapabilities";
    const newItem = new CatalogoServico({
      descricao: item.descricao,
      url: url,
      tipo: "WFS",
    });
    items.push(newItem);
  }
  if (item.wcsAvailable) {
    const url = item.url + "/?service=wcs&request=getCapabilities";
    const newItem = new CatalogoServico({
      descricao: item.descricao,
      url: url,
      tipo: "WCS",
    });
    items.push(newItem);
  }
  return items;
}

(async () => {
  for (let value of catalogo) {
    const idx =
      value.descricao.indexOf("-") == -1 ? 0 : value.descricao.indexOf("-");
    let sigla = "";
    if (idx > 0) sigla = value.descricao.substring(0, idx);
    else sigla = value.descricao.substring(idx, value.descricao.length);
    value["sigla"] = sigla.trim();
  }
  atores = await Ator.find({});
  let count = 0;
  for (let ct of catalogo) {
    const ator = await atores.find((at) =>
      ct.sigla.toUpperCase().includes(at.sigla.toUpperCase())
    );
    if (ator) {
      const listaCatalogoServico = createListaCatalogoServicoFromINDE(ct);
      for (let cs of listaCatalogoServico) {
        cs.ator = ator._id.toString();
        //console.log(cs);
        //await cs.save();
      }
    } else console.log("Ator não encontrado para: ", ct.descricao);
  }

  //console.log(catalogo);
})();

module.exports = catalogo;
