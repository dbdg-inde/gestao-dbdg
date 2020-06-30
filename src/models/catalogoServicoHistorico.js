const mongoose = require('mongoose')
const catalagoServicoHistoricoSchema = new mongoose.Schema({
    dataHora: {type: Date, default: new Date(), required: true},
    quantidadeRecursos: {type: Number, requiredPaths: true},
    statusServico: {type: String, required: true},
    tempoResposta: {type: Number},
    catalagoServico: {type: mongoose.SchemaTypes.ObjectId, ref: 'CatalagoServico'}
})
const CatalagoServicoHistorico = mongoose.model('CatalagoServicoHistorico', catalagoServicoHistoricoSchema)
module.exports=CatalagoServicoHistorico 