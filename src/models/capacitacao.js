const mongoose = require('mongoose')
const capacitacaoSchema = new mongoose.Schema({
    nome: {type: String, required: true, unique: true},
    descricao: [{type: String}],
    dataInicio: {type: Date},
    dataFim: {type: Date}    
}, {collection: 'capacitacao'})
const Capacitacao = mongoose.model('Capacitacao', capacitacaoSchema)
module.exports = Capacitacao