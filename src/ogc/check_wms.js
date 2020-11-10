const xml2js = require("xml2js");
const fetch = require("node-fetch");

const req = async () => {
  const WMSCapabilities = require("./WMSCapabilities");
  const response = await fetch("https://inde.gov.br/api/catalogo/get");
  let total = 0;
  const catalogos_wms_json = await response.json();
  for (let catalogo_json in catalogos_wms_json) {
    if (catalogos_wms_json.hasOwnProperty(catalogo_json)) {
      const obj = catalogos_wms_json[catalogo_json];
      const url = obj.url + "/?service=WMS&request=GetCapabilities";
      console.log(url);
      const reqWMS = new WMSCapabilities(url);
      try {
        const res = await reqWMS.lenLayerObjects();
        total += res;
        console.log(`${obj.descricao} camadas : `, res);
      } catch (error) {
        console.log(error.message);
        console.log(`Problema no catálog: ${obj.descricao}`);
      }
    }
  }
  console.log("Total de geosserviços: ", total);
};
req();
