const Ator = require('./../models/ator')
const mongoose = require ('mongoose')
const historicoSchema = new mongoose.Schema({
  data_contato:{type:Date,required:true},
  nome_contato:{type:String, required:true},
  email_contato:{type:String, required: true},  
  descricao:{type:String, required:true},
  arquivo:{type:String},
  ator:{type: mongoose.SchemaTypes.ObjectId, required:true, ref:'Ator'}
},{collection:'historico'})
const Historico = mongoose.model('Historico', historicoSchema)
module.exports = Historico
