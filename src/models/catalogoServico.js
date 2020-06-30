const mongoose = require('mongoose')
const catalogoServicoSchema = new mongoose.Schema({
    nome: {type: String, trim: true},
    descricao: {type: String, trim: true},
    url: {type: String, required: true},
    tipo: {type: String, required: true},
    historico: [{
        dataHora: {type: Date, default: new Date(), required: true},
        quantidadeRecursos: {type: Number, required: true},
        statusServico: {type: String, required: true},
        tempoResposta: {type: Number},
    }],
    ator: {type: mongoose.SchemaTypes.ObjectId, ref: 'Ator', required: true}
})
const CatalogoServico= mongoose.model('CatalogoServico', catalogoServicoSchema)
module.exports= CatalogoServico