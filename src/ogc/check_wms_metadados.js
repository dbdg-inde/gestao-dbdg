
async function req_wms_metadados(url_catalogo = null)  {
    const WMSCapabilities = require("./WMSCapabilities");
    if (!url_catalogo)
        url_catalogo =  'http://cmr.funai.gov.br/geoserver/ows/?service=WMS&request=GetCapabilities'
    let url = url_catalogo
    if (!url_catalogo.toLowerCase().includes('&request=GetCapabilities'.toLocaleLowerCase()))
        if (url_catalogo.length - 1 === '/')
            url = url_catalogo + "?service=WMS&request=GetCapabilities";
        else
            url = url_catalogo + "/?service=WMS&request=GetCapabilities";
    console.log(url);
    const reqWMS = new WMSCapabilities(url=url);
    
    try {
        const res = await reqWMS.lenLayerObjects();
        console.log(`Quantidade de camadas : ${res}`);
        const qtd_layer_sem_metadados = await reqWMS.lenLayerObjectsWithoutMetadata() 
        console.log(`Quantidade de camadas sem apontamento para metadados : ${qtd_layer_sem_metadados}`);
        const layes_sem_metadados = await reqWMS.layerNamesWithoutMetadata() 
        console.log(`Nome das camadas sem apontamento para metadados : ${layes_sem_metadados}`);
        const layes_title_metadados = await reqWMS.layerTitlesWithoutMetadata() 
        console.log(`Títulos das camadas sem apontamento para metadados : ${layes_title_metadados}`);
        const layes_title_name = await reqWMS.lenLayersNameNotEqualTitleObjects() 
        console.log(`Quantidade de camadas com nome diferente do título : ${layes_title_name}`);
        const layes_ti_name = await reqWMS.layersNameNotEqualTitleObjects() 
        console.log(`Nome das camadas cujo nome difere do título : ${layes_ti_name}`);
        
    } catch (error) {
        console.log(error.message);
        console.log(`Problema no catálogo: ${url}`);
    }
      
}
req_wms_metadados();
