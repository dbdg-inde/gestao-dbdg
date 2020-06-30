const xml2js = require("xml2js");
const fetch = require("node-fetch");
const pathDir = "C:\\desenv\\gestao-dbdg\\src\\test\\testogc\\files\\";

const req = async () => {
  const fs = require("fs");

  const WMSCapabilities = require("./WMSCapabilities");
  //const url = "http://www.geoportal.eb.mil.br/mapcache3857?service=WMS&request=GetCapabilities"
  //const url = "http://panorama.sipam.gov.br/geoserver/publico/ows/?service=WMS&request=GetCapabilities"
  //const url = "http://www.aisweb.decea.gov.br/geoserver/ICA/wms?service=wms&version=1.3.0&request=GetCapabilities"
  // const url = pathDir + "cesipan_wms_getcapabilities.xml"
  //const url = "dsg_wms_getcapabilities.xml"
  const url =
    "http://sistemas.anatel.gov.br/geoserver/ANATEL/ows?service=WMS&request=GetCapabilities";
  const reqWMS = new WMSCapabilities(url);
  //const objectWMS = await reqWMS.getXmlObject()
  //const res = await reqWMS.layerObjectsByName('ram_colorimetria_50')
  //const res = await reqWMS.layerObjectsByTitle('ram_colorimetria_50')
  //const res = await reqWMS.layerObjects()
  let res = null;
  res = await reqWMS.version();
  console.log("resultado: ", res);

  //const res = await reqWMS.metadataURLObjects()
  //const res = await reqWMS.lenMetadataURL()
  //const res = await reqWMS.layerCRSObjects()
  //const res = await reqWMS.layerObjectsWithoutMetadata()
  //const res = await reqWMS.lenLayerObjectsWithoutMetadata()
};
req();
