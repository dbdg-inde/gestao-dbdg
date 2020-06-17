const xml2js = require('xml2js')
const fetch = require('node-fetch');

const req = async () => {
     const WMSCapabilities = require('./WMSCapabilities')
    //const url = "http://www.geoportal.eb.mil.br/mapcache3857?service=WMS&request=GetCapabilities"
    //const url = "http://panorama.sipam.gov.br/geoserver/publico/ows/?service=WMS&request=GetCapabilities"
    //const url = "http://www.aisweb.decea.gov.br/geoserver/ICA/wms?service=wms&version=1.3.0&request=GetCapabilities"
   // const url = "C:\\desenv\\node-des\\inde-dbdg-gestao\\tests\\files\\cesipan_wms_getcapabilities.xml"
    //const url = "C:\\desenv\\node-des\\inde-dbdg-gestao\\tests\\files\\dsg_wms_getcapabilities.xml"
    const url = 'https://geoservicos.inde.gov.br/geoserver/BNDES/ows?service=wms&version=1.3.0&request=GetCapabilities'
    const reqWMS = new WMSCapabilities(url)
    //const objectWMS = await reqWMS.getXmlObject()
    //const res = await reqWMS.layerObjectsByName('ram_colorimetria_50')
    //const res = await reqWMS.layerObjectsByTitle('ram_colorimetria_50')
    //const res = await reqWMS.layerObjects()
    
    const res = await reqWMS.lenLayerObjects()
    //const res = await reqWMS.metadataURLObjects()
    //const res = await reqWMS.lenMetadataURL()
    //const res = await reqWMS.layerCRSObjects()
    //const res = await reqWMS.layerObjectsWithoutMetadata()
    //const res = await reqWMS.lenLayerObjectsWithoutMetadata()
    console.log("resultado: ",  res)
}
req()



