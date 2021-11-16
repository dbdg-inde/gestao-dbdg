const fetch = require('node-fetch')
const xml2js = require('xml2js')
const fs = require('fs') 
const util = require('util')
const readFile = util.promisify(fs.readFile)

class XMLHandle {
    constructor(aXMLFileNameWithPath, aRootName) {
        this.xmlFileNameWithPath = aXMLFileNameWithPath
        this.rootName = aRootName
        this.xmlString = null
        this.xmlObject = null
    }
    async convertToXmlObject(xmlString) {
        const parser = new xml2js.Parser(/* options */);
        this.xmlObject = await parser.parseStringPromise(xmlString)
        if (!this.xmlObject[this.rootName]) {
            throw Error(`O xml lido não contém a tag: ${this.rootName}`)
            return null
        }
        return this.xmlObject
    }
    async initializeXmlObjectFromFile() {
        try {
             this.xmlString = await readFile(this.xmlFileNameWithPath)
             return await this.convertToXmlObject(this.xmlString)    
        } catch (error) {
            console.log(error)
            throw new Error(`Houve algum na leitura: ${this.url}. Detalhes do erro: ${error.message}`)
            return null
        }
    }
    async getXmlObject() {
        if (this.xmlObject)
            return this.xmlObject
        return await this.initializeXmlObjectFromFile()     
    }
}
module.exports=XMLHandle