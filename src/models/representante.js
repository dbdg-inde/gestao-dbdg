const Capacitacao = require('./../models/capacitacao')
const mongoose = require('mongoose')
const representanteSchema = new mongoose.Schema({
    nome:{type: String, required: true, unique: true},
    funcao_cargo:{type: String},
    area_setor:{type:String},
    email1:{type: String},
    email2:{type: String},
    telefone1:{type: String},
    telefone2:{type: String},
    celular:{type: String},
    gestor:{type:Boolean, default: false},
    capacitado:{type:Boolean,default: false},
    capacitacao:[{type: mongoose.SchemaTypes.ObjectId, ref:'Capacitacao'}],
    ator:{type: mongoose.SchemaTypes.ObjectId, required: true, ref:'Ator'}
},{collection:'representante'})

const Representante = mongoose.model('Representante', representanteSchema)
module.exports = Representante

