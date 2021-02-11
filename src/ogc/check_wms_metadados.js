
async function req_wms_metadados(url_catalogo = null)  {
    const WMSCapabilities = require("./WMSCapabilities");
    if (!url_catalogo)
        url_catalogo = ' http://www.snirh.gov.br/arcgis/services/INDE/Camadas/MapServer/WMSServer'
    let url = null
    if (url_catalogo.length - 1 === '/')
        url = url_catalogo + "?service=WMS&request=GetCapabilities";
    else
        url = url_catalogo + "/?service=WMS&request=GetCapabilities";
    console.log(url);
    const reqWMS = await new WMSCapabilities(url);
    try {
        const res = await reqWMS.lenLayerObjects();
        console.log(`Quantidade de camadas : ${res}`);
        const qtd_layer_sem_metadados = await reqWMS.lenLayerObjectsWithoutMetadata() 
        console.log(`Quantidade de camadas sem apontamento para metadados : ${qtd_layer_sem_metadados}`);
        const layes_sem_metadados = await reqWMS.layerNamesWithoutMetadata() 
        console.log(`Camadas sem apontamento para metadados : ${layes_sem_metadados}`);
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
