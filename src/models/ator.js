const Documentacao = require('./../models/documentacao')
const mongoose = require('mongoose')
const atorSchema = new mongoose.Schema({
    nome: {type: String, required: true, unique: true},
    esfera: {type: String, required: true},
    statusAdesao: {type: String, required: true},
    nomeInstituicaoOrigem: [{nome: String, dataInclusao: Date}],
    sigla: {type: String},
    capacitacao: {type: Boolean},
    modalidade: {type: String},
    observacao: [{type: String}],
    dataOficio: {type: Date},
    dataEmail: {type: Date},
    dataSolicitacaoAdesao: {type: Date},
    dataInteresse: {type: Date}
}, {collection: 'ator'})
atorSchema.methods.documentacoes = async function() {
    const ator = this
     const docs = await Documentacao.find({ator: ator._id})
    return docs
} 
const Ator = mongoose.model('Ator', atorSchema)
module.exports = Ator