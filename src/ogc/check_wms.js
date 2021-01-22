const xml2js = require("xml2js");
const fetch = require("node-fetch");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const req = async () => {
  const WMSCapabilities = require("./WMSCapabilities");
  let response = null;
  try {
    response = await fetch("https://inde.gov.br/api/catalogo/get");
  
  
    let total = 0;
    const catalogos_wms_json = await response.json();
    for (let catalogo_json in catalogos_wms_json) {
      if (catalogos_wms_json.hasOwnProperty(catalogo_json)) {
        const obj = catalogos_wms_json[catalogo_json];
        let url = null;
        if (obj.url[obj.url.length - 1] === '/' )
          url = obj.url + "?service=WMS&request=GetCapabilities";
        else
          url = obj.url + "/?service=WMS&request=GetCapabilities";
        console.log(url);
        const reqWMS = new WMSCapabilities(url);
        try {
          const res = await reqWMS.lenLayerObjects();
          total += res;
          console.log(`${obj.descricao} camadas : `, res);
        } catch (error) {
          console.log(error.message);
          console.log(`Problema no catálogo: ${obj.descricao}`);
        }
      }
    }
    console.log("Total de geosserviços: ", total);
  } catch (error) {
    console.log(error.message);
  }
};
req();
