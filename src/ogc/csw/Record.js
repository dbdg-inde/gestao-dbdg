const xml2js = require('xml2js')
class Record {
    constructor(anUrl, id, version='2.0.2', elementSetName='full', outputSchema='http://www.isotc211.org/2005/gmd') {
        
        this.urlRecordById = `${anUrl}?service=CSW&version=${version}&request=GetRecordById&id=${id}&elementSetName=${elementSetName}&outputSchema=${outputSchema}`
        this.id = id
        this.version = version
        this.elementSetName = elementSetName
        this.outputSchema = outputSchema
        this.xmlString = null
        this.xmlObject = null
        this.metadataType = null
        
    }
    async getXmlObject() {
        if (!this.xmlString)
            return null
        if (!this.xmlObject) {
            const parser = new xml2js.Parser(/* options */);
            this.xmlObject = await parser.parseStringPromise(this.xmlString)
        }
        return this.xmlObject
    }
    async getRecordByIdResponse() {
        let xmlObj = await this.getXmlObject()
        return await xmlObj['csw:GetRecordByIdResponse']
    }
    async xmlns() {
        let obj = await this.getRecordByIdResponse()
        return await obj['$']
    }
    objectOutputSchemaMetadataURIClass() {
        return {"http://www.isotc211.org/2005/gmd": Iso19115Metadata2003,
                "http://www.opengis.net/cat/csw/2.0.2": DCMetadata
        }
    }
    async getMetadataType() {
        if (!this.metadataType) {
            let metadataClass = this.objectOutputSchemaMetadataURIClass()[this.outputSchema]
            if (!metadataClass) 
                this.metadataType = new Iso19115Metadata2003(this)
            else
                this.metadataType = new metadataClass(this)
        }
        return this.metadataType

    }
    async recordMetadata() {
        let mt = await this.getMetadataType()
        return await mt.recordMetadata()
    }
    async identifier() {
        let mt = await this.getMetadataType()
        return await mt.identifier()
    }
    async modified() {
        let mt = await this.getMetadataType()
        return await mt.modified()
    }
    async title() {
        let mt = await this.getMetadataType()
        return await mt.title()
    }
    async format() {
        let mt = await this.getMetadataType()
        return await mt.format()
    }
    async metadataStandardName() {
        let mt = await this.getMetadataType()
        return await mt.metadataStandardName()

    }
    async metadataStandardVersion() {
        let mt = await this.getMetadataType()
        return await mt.metadataStandardVersion()

    }
    async abstractMetadata() {
        let mt = await this.getMetadataType()
        return await mt.abstractMetadata()
    }
    async keywords() {
        let mt = await this.getMetadataType()
        return await mt.keywords()
    }
}

class DCMetadata {
    constructor(record) {
        this.record = record
    }
    async getRecordByIdResponse() {
        return await this.record.getRecordByIdResponse()
    }
    elementSetNameType() {
        return {"full": "csw:Record", "summary": "csw:SummaryRecord", "brief": "csw:BriefRecord"}
    }
    async recordMetadata() {
        let rbir = await this.getRecordByIdResponse()
        return await rbir[this.elementSetNameType()[this.record.elementSetName]][0]
    }
    async identifier() {
        let recordM = await this.recordMetadata()
        let iden = await recordM['dc:identifier'][0]
        if (!iden)
            return null
        return iden
    }
    async modified() {
        let recordM = await this.recordMetadata()
        let modi =  await recordM['dc:date'][0]
        if (!modi)
            return null
        return modi
    }
    async title() {
        let recordM = await this.recordMetadata()
        let tit = await recordM['dc:title'][0]
        if (!tit)
            return null
        return tit
    }
    
    async format() {
        let recordM = await this.recordMetadata()
        let fort = await recordM['dc:format']
        if (!fort)
            return null
        return fort
    }
    async keywords() {
        let recordM = await this.recordMetadata()
        let keyws = await recordM['dc:subject']
        if (!keyws)
            return null
        return keyws
    }

    async abstractMetadata() {
        let recordM = await this.recordMetadata()
        return await recordM['dct:abstract'][0]
    }
    async metadataStandardName() {
        return null
    }
    async metadataStandardVersion() {
        return null
    }
}
class Iso19115Metadata2003 {
    constructor(record) {
        this.record = record
    }
    async getRecordByIdResponse() {
        return await this.record.getRecordByIdResponse()
    }
   
    async recordMetadata() {
        let rbir = await this.getRecordByIdResponse()
        return await rbir['gmd:MD_Metadata'][0]
    }
    async identifier() {
        let recordM = await this.recordMetadata()
        let fileIdentifiers = await recordM['gmd:fileIdentifier']
         if (!fileIdentifiers)
            return null
        let gcoCharacterString = await fileIdentifiers[0]
        return await gcoCharacterString['gco:CharacterString'][0]
    }
    async modified() {
        let recordM = await this.recordMetadata()
        let gcoDates = await recordM['gmd:dateStamp']
        if (!gcoDates)
            return null
        return await gcoDates[0]['gco:DateTime'][0]
    }
    async title() {
        let recordM = await this.recordMetadata()
        let gmdIdentificationInfo = await recordM['gmd:identificationInfo']
        if (!gmdIdentificationInfo)
            return null
        let gmdMD_DataIdentification = await gmdIdentificationInfo[0]['gmd:MD_DataIdentification']
        if (!gmdMD_DataIdentification)
            return null
        let gmdCitation = await gmdMD_DataIdentification[0]['gmd:citation']
        if (!gmdCitation)
            return null
        let gmdCI_Citation = await gmdCitation[0]['gmd:CI_Citation']
        if (!gmdCI_Citation)
            return null
        let gmdTitle = await gmdCI_Citation[0]['gmd:title']
        if (!gmdTitle)
            return null
        return await gmdTitle[0]['gco:CharacterString'][0]
    }
    async distribution_format(gmdMD_Distribution) {
        return gmdMD_Distribution
    }
    async format() {
        let recordM = await this.recordMetadata()
        let gmdDistributionInfo = await recordM['gmd:distributionInfo']
        if (!gmdDistributionInfo)
            return null
        let gmdMD_Distributions = await gmdDistributionInfo[0]['gmd:MD_Distribution']
        if (!gmdMD_Distributions)
            return null
        let gmdDistributionFormat = await gmdMD_Distributions[0]['gmd:distributionFormat']
        if( !gmdDistributionFormat)
            return null
    }
    async metadataStandardName() {
        let recordM = await this.recordMetadata()
        let gmdMetadataStandardName = await recordM['gmd:metadataStandardName'][0]
        return await gmdMetadataStandardName['gco:CharacterString'][0]['_']
    }
    async metadataStandardVersion() {
        let recordM = await this.recordMetadata()
        let gmdMetadataStandardVersion = await recordM['gmd:metadataStandardVersion'][0]
        return await gmdMetadataStandardVersion['gco:CharacterString'][0]['_']
    }
}

module.exports=Record