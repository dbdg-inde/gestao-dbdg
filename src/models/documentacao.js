const mongoose = require('mongoose')
const documentacaoSchema = new mongoose.Schema({
    arquivo: {type: String, required: true, unique: true},
    data: {type: Date, required: true},
    ator: {type: Number, required: true}    
}, {collection: 'documentacao'})
const Documentacao = mongoose.model('Documentacao', documentacaoSchema)
module.exports = Documentacao