require("./../src/db/dbMongoose");
const Ator = require("./../src/models/ator");
const fs = require("fs");
const atorCatalogos = JSON.parse(
  fs.readFileSync("C:\\desenv\\gestao-dbdg\\migracao\\ator-list.json", "utf8")
);
//console.log(catalogo)
(async () => {
  for (let atorCatalogo of atorCatalogos) {
    let idx = atorCatalogo.nome.indexOf("-");
    if (idx == -1) idx = atorCatalogo.nome.indexOf("–");

    let sigla = atorCatalogo.nome
      .substring(idx + 1, atorCatalogo.nome.length)
      .trim();
    objCat = {
      nome: (idx > -1
        ? atorCatalogo.nome.substring(0, idx)
        : atorCatalogo.nome
      ).trim(),
      sigla: sigla,
      esfera: "Federal",
      statusAdesao: atorCatalogo.status_adesao,
      nomeInstituicaoOrigem: [],
      capacitacao: atorCatalogo.status_adesao == "Sim" ? true : false,
      modalidade: atorCatalogo.modalidade,
      observacao: [atorCatalogo.observacao],
      dataOficio: new Date(atorCatalogo.data_oficio),
      dataEmail: null,
      dataSolicitacaoAdesao: null,
      dataInteresse: null,
      id_ator: atorCatalogo.id_ator,
    };
    const ator = new Ator(objCat);

    await ator.save();
  }
})();
module.exports = atorCatalogos;
