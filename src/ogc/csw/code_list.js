const XMLHandle = require('../xml_handle')
class CodeListXMLIso19115 {
    constructor(aXMLFileWithPath) {
        this.aXMLFileWithPath = aXMLFileWithPath
        this.xmlHandle = null
        this.xmlObject = null
    }
    async initializeXmlObject() {
        this.xmlHandle = await new XMLHandle(this.aXMLFileWithPath, 'cat:CT_CodelistCatalogue')
        return this.xmlHandle.getXmlObject()
    }
    async getXmlObject() {
        if (this.xmlObject)
            return this.xmlObject
        this.xmlObject = await this.initializeXmlObject()
        return this.xmlObject
    }
    async nodeRoot() {
        const xo = await this.getXmlObject()
        return xo['cat:CT_CodelistCatalogue']
    }
    async catName() {
        const nr = await this.nodeRoot() 
        return nr['cat:name'][0]
    }
    async name() {
        const xo = await this.catName()
        return xo['gco:CharacterString'][0]
    }
    async catScope() {
        const nr = await this.nodeRoot() 
        return nr['cat:scope'][0]
    }
    async scope() {
        const xo = await this.catScope()
        return xo['gco:CharacterString'][0]
    }
    async catFieldOfApplication() {
        const nr = await this.nodeRoot() 
        return nr['cat:fieldOfApplication'][0]
    }
    async fieldOfApplication() {
        const xo = await this.catFieldOfApplication()
        return xo['gco:CharacterString'][0]
    }
    async catVersionNumber() {
        const nr = await this.nodeRoot() 
        return nr['cat:versionNumber'][0]
    }
    async versionNumber() {
        const xo = await this.catVersionNumber()
        return xo['gco:CharacterString'][0]
    }
    async catVersionDate() {
        const nr = await this.nodeRoot() 
        return nr['cat:versionDate'][0]
    }
    async versionDate() {
        const xo = await this.catVersionDate()
        return xo['gco:Date'][0]
    }
    async catLanguage() {
        const nr = await this.nodeRoot() 
        return nr['cat:language'][0]
    }
    async language() {
        const xo = await this.catLanguage()
        return xo['gco:CharacterString'][0]
    }
    async characterSet() {
        const nr = await this.nodeRoot() 
        return nr['cat:characterSet'][0]['lan:MD_CharacterSetCode'][0]['$']['codeListValue']
    }
    async codelistItem(){
        const nr = await this.nodeRoot() 
        return nr['cat:codelistItem']
    }
    
}
async function codeList() {
    const fileNameWithPath = 'C:/IBGE/dbdg/perfil-mgb/iso19115-3.2018/schema/standards.iso.org/19115/resources/codelists.xml'
    const  codeListXMLIso19115 = new CodeListXMLIso19115(fileNameWithPath)
    //console.log(await codeListXMLIso19115.nodeRoot() )
    console.log(await codeListXMLIso19115.name() )
    console.log(await codeListXMLIso19115.scope() )
    console.log(await codeListXMLIso19115.fieldOfApplication() )
    console.log(await codeListXMLIso19115.versionNumber() )
    console.log(await codeListXMLIso19115.versionDate() )
    console.log(await codeListXMLIso19115.characterSet() )
    console.log(await codeListXMLIso19115.codelistItem() )
    
}

codeList()
