let expect = require('chai').expect
const WMSCapabilities = require('../../ogc/WMSCapabilities')
const urlsOrFiles = ["http://www.geoportal.eb.mil.br/mapcache3857?service=WMS&request=GetCapabilities",
        "http://panorama.sipam.gov.br/geoserver/publico/ows/?service=WMS&request=GetCapabilities",
        "http://wms.snirh.gov.br/arcgis/services/SNIRH/2016/MapServer/WMSServer/?service=WMS&request=GetCapabilities",
        "http://sistemas.anatel.gov.br/geoserver/ANATEL/ows?service=WMS&request=GetCapabilities",
        "http://geoinfo.cnpa.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",
        "http://geoinfo.cpatu.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",
        "http://atlas.geoinfo.cnpm.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",
        "http://geoinfo.cpact.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",
        "http://geoinfo.cnpf.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",
        "http://geoinfo.cnptia.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",
        "http://geoinfo.cnpma.embrapa.br/geoserver/ows?service=WMS&request=GetCapabilities",



]
describe('Testa os objetos do XML retornado do getCapabilities do WMS', async function () {
    it('Deve retornar a versão do WMS', async function () {
        urlsOrFiles.forEach(async urlOrFile => {
            const reqWMS = await new WMSCapabilities(urlOrFile)
            res = await reqWMS.version()
            expect(res.includes('1.')).to.equal(true)
        });
        

    })
})
