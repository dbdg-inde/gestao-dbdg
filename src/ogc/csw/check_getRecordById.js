const xml2js = require("xml2js");
const fetch = require("node-fetch");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const req = async () => {
  const Record = require("./Record");
  //let record = new Record('https://metadados.inde.gov.br/geonetwork/srv/por/csw', '5f7eaa79-771c-4e42-b6e7-6c2defad4ad4', '2.0.2','full', 'http://www.isotc211.org/2005/gmd') 
  let record = new Record('http://www.metadados.idesp.sp.gov.br/catalogo/srv/por/csw', 'e60dbb1a-3040-43d7-86d2-e1fdd58eef9a', '2.0.2','full', 'http://www.isotc211.org/2005/gmd') 
  //console.log(record)  
  let res = null;
  try {
    //let url = "https://metadados.inde.gov.br/geonetwork/srv/por/csw?service=CSW&version=2.0.2&request=GetRecordById&id=2c48758a-8326-40e7-a774-7230548e5afd&elementSetName=full&outputSchema=http://www.opengis.net/cat/csw/2.0.2"  
    res = await fetch(record.urlRecordById);
    xmlString = await res.text() 
    record.xmlString=xmlString
    //console.log(await record.getRecordByIdResponse())
    //console.log(await record.recordMetadata())
    //console.log(await record.xmlns())
    console.log(await record.identifier())
    console.log(await record.modified())
    console.log(await record.title())
    console.log(await record.format())
    /*console.log(await record.metadataStandardName())
    console.log(await record.metadataStandardVersion())
    console.log(await record.abstractMetadata())
    console.log(await record.keywords())*/
    
  } catch (error) {
    console.log(error.message);
    //console.log(`Problema no catálogo: ${obj.descricao}`);
  }
}
req();