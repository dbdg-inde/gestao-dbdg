const mongoose = require('mongoose')
const documentacaoSchema = new mongoose.Schema({
    arquivo: {type: String, required: true, unique: true},
    data: {type: Date, required: true},
    ator: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Ator'}    
}, {collection: 'documentacao'})
// documentacaoSchema.pre('find', function() {
//     this.populate('ator')
// })
const Documentacao = mongoose.model('Documentacao', documentacaoSchema)
module.exports = Documentacao