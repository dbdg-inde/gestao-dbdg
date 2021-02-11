/*
WMS_Capabilities
    Service
        Name
        Title
        Abstract
        KeywordList
    Capability
*/
const fetch = require('node-fetch')
const xml2js = require('xml2js')
const fs = require('fs') 
const util = require('util')
const { join } = require('path')
const readFile = util.promisify(fs.readFile)
class WMSCapabilities {
    constructor(anUrl) {
        this.requireWMS = {}
        this.res = null
        this.url = anUrl
        this.xmlString = null
        this.xmlObject = null
    }
    ola() {
        return "OLÁ"
    }
    async filterObject (obj, filterKey, filterValue) { 
        return Object.keys(obj).reduce((acc, val) => 
                (obj[val][filterKey] !== filterValue ? acc : {...acc,[val]: obj[val]}                                        
        ), {})
    }
    async convertToXmlObject(xmlString) {
        const parser = new xml2js.Parser(/* options */);
        this.xmlObject = await parser.parseStringPromise(xmlString)
        if (!this.xmlObject['WMS_Capabilities'])
            throw Error("O xml lido não tem o formato do WMS getCapabilities!")
        return this.xmlObject
    }
    async initializeXmlObject() {
        try {
            this.res = await fetch(this.url)
            const headers = await this.res.headers.raw()
            if (!this.res.status === 200) {
                throw new Error(`Houve algum problema na requisição ${this.url}.Status code:${this.res.status}`)
            }
            const contentType = await headers['content-type']
            if (!contentType[0].startsWith('text/xml'))    
                throw new Error("O content type deveria ser text/xml, mas veio text/html. Verifique se há algo errado no URL: " + this.url)    
            this.xmlString = await this.res.text() 
            return await this.convertToXmlObject(this.xmlString)
        } catch (error) {
            console.log(error)
            return this.xmlObject = null
        }
    }
    async initializeXmlObjectFromFile(fileNameWithPath) {
        try {
             this.xmlString = await readFile(fileNameWithPath)
             return await this.convertToXmlObject(this.xmlString)    
        } catch (error) {
            console.log(error)
        }
    }
    async  xmlText() {
        if (this.res.status === 200) 
            return this.xmlString = await this.res.text()
    }
    isURL(anUrlOrFileNameWithPath){
        const urlOrFileNameWithPath = anUrlOrFileNameWithPath.toLowerCase()
        return urlOrFileNameWithPath.search(/(http:|https:)/) > -1
    }
    async getXmlObject() {
         if (this.xmlObject)
            return this.xmlObject
         if (this.isURL(this.url))    
            return await this.initializeXmlObject()  
         else
            return await this.initializeXmlObjectFromFile(this.url)     
    }
    //Service is a element providing general metadata for the server as a whole.
    async service() {
        const xmlObj = await this.getXmlObject()
        if (!xmlObj)
            return null
        return await xmlObj['WMS_Capabilities']['Service'][0]
    }
    //The Name is a text string used for machine-to-machine communication 
    async serviceName() {
        const serv = await this.service()
        return await serv['Name']
    }
    //Tthe Title is for the benefit of humans communication 
    async serviceTitle() {
        const serv = await this.service()
        return await serv['Title']
    }
    //Optional service metadata
    async serviceAbstract() {
        const serv = await this.service()
        return await serv['Abstract']
    }
    //Optional service metadata
    async serviceKeywords() {
        const serv = await this.service()
        const keyWords = serv['KeywordList']
        if (keyWords)
           return keyWords['Keyword'][0]
        return null
    }
    async serviceOnlineResource() {
        const serv = await this.service()
        return await serv['OnlineResource'][0]['$']
    }
    async serviceContactInformation() {
        let serv = await this.service()
        serv = await serv['ContactInformation']
        if (!serv)
            return null
        
        return await serv[0]
    }
    async serviceMaxWidth() {
        const serv = await this.service()
        if (!serv)
            return null
        const maxWidth = await serv['MaxWidth']
        if (!maxWidth)
            return null
        return await maxWidth[0]
    }
    async serviceMaxHeight() {
        const serv = await this.service()
        if (!serv)
            return null
        const maxHeight = await serv['MaxHeight']
        if (!maxHeight)
            return null
        return maxHeight[0]
    }
    async serviceContactInformationPerson() {
        let serv = await this.serviceContactInformation()
        serv = await serv['ContactPersonPrimary']
        if (!serv)
           return null
        serv = await serv[0]
        return serv['ContactPerson'][0]
    }
    async serviceContactInformationOrganization() {
        let serv = await this.serviceContactInformation()
        serv = await serv['ContactPersonPrimary']
        if (!serv)
           return null
        serv = await serv[0]
        return serv['ContactOrganization'][0]
    }
    async serviceContactInformationPosition() {
        let serv = await this.serviceContactInformation()
        return serv['ContactPosition'][0]
    }
    async serviceContactInformationAdress() {
        let serv = await this.serviceContactInformation()
        return serv['ContactAddress'][0]
    }
    async serviceContactInformationTelefone() {
        let serv = await this.serviceContactInformation()
        return serv['ContactVoiceTelephone']
    }
    async serviceContactInformationFax() {
        let serv = await this.serviceContactInformation()
        return serv['ContactFacsimileTelephone']
    } 
    async serviceContactInformationeMail() {
        let serv = await this.serviceContactInformation()
        return serv['ContactElectronicMailAddress']
    }
    async serviceFees() {
        let serv = await this.service()
        return serv['Fees']
    }
    async serviceAccessConstraints() {
        let serv = await this.service()
        return serv['AccessConstraints']
    }
    //names the actual operations that are supported by the server
    async capability() {
        const xmlObj = await this.getXmlObject()
        
        if (!xmlObj)
            return null
        return await xmlObj['WMS_Capabilities']['Capability'][0]
    }
    async capabilityRequest() {
        const request = await this.capability()
        return request['Request'][0]
    }
    async capabilityGetCapabilities() {
        const operations =  await this.capabilityRequest()
        return await operations['GetCapabilities']
    }
    async capabilityGetCapabilities() {
        const operations =  await this.capabilityRequest()
        return await operations['GetCapabilities']
    }
    async capabilityGetMap() {
        const operations =  await this.capabilityRequest()
        return await operations['GetMap']
    }
    async capabilityGetFeatureInfo() {
        const operations =  await this.capabilityRequest()
        return await operations['GetFeatureInfo']
    }
    async capabilityException() {
        const operations =  await this.capability()
        return await operations['Exception']
    }
    async capabilityParentLayer() {
        const operations =  await this.capability()
        const parentLayer = await operations['Layer']
        return await parentLayer[0]
    }
    async parentLayerTitle() {
        const cl =  await this.capabilityParentLayer()
        return await cl['Title']
    }
    async parentLayerAbstract() {
        const cl =  await this.capabilityLayer()
        const abs = await cl['Abstract']
        return await abs[0]
    }
    async parentLayerCRSs() {
        const cl =  await this.capabilityParentLayer()
        const crss = await cl['CRS']
        return crss
    }
    /* EX_GeographicBoundingBox is to facilitate geographic searches without requiring coordinate
    transformations by the search engine */
    async parentLayerGeographicBoundingBox() {
        const cl =  await this.capabilityParentLayer()
        const crss = await cl['EX_GeographicBoundingBox']
        return await crss[0]
    }
    async parentLayerBoundingBox() {
        const cl =  await this.capabilityParentLayer()
        let bbox = await cl['BoundingBox']
        bbox = await bbox['0']
        return bbox['$']
    }
    async layerObjects() {
        const cl =  await this.capabilityParentLayer()
        let lays = await cl['Layer']
        //lays = await lays[0]
        return lays
    }
    async lenLayerObjects() {
        const ls = await this.layerObjects()
        return await  Object.keys(ls).length
    }
    async layerObjectsBy(field_name, field_value) {
        let layers_objects = await this.lenLayerObjects()
        return await layers_objects.filter(
            (layerObj) => { return layerObj[field_name][0] === field_value})
    }
    async layerObjectsByName(a_name) {
        return await this.layerObjectsBy('Name', a_name)
    }
    async layerObjectsByTitle(a_title) {
        return await this.layerObjectsBy('Title', a_title)
    }
    async layerObjectsByCRS(a_crs_str) {
        return await this.layerObjectsBy('CRS', a_crs_str)
    }
    //A server should use one or more <MetadataURL>
    async metadataURLObjects() {
        const layers = await this.layerObjects()
        const metadataObjects = await layers.map((layerObj) => {
           return layerObj['MetadataURL']
        })
        return metadataObjects
    }
    async layerObjectsWithoutMetadata() {
        const layers = await this.layerObjects()
        const layerObjects = await layers.filter((layerObj) => {
           return !layerObj['MetadataURL']
        })
        return layerObjects
    }

    async lenLayerObjectsWithoutMetadata(){
        const layerObjects = await this.layerObjectsWithoutMetadata()
        return await layerObjects.length
    }
    
    async lenMetadataURL() {
        const metadados = await this.metadataURLObjects()
        const arr = await metadados.filter(metadata => {return metadata} )
        return arr.length
    }
    async layerCRSObjects() {
        const layers = await this.layerObjects()
        const crsObjects = await layers.map((layerObj) => {
           return layerObj['CRS']
        })
        return crsObjects
    }
    
}
module.exports=WMSCapabilities
