const express = require('express')
const router = express.Router()
const auth = require('./../middlewares/auth.js')
const permissao = require('./../middlewares/permissao.js')
const Capacitacao = require('../models/capacitacao')
router.post('/capacitacoes',auth, permissao, async (req, res) =>{
    
     try {
        const capacitacao = new Capacitacao(req.body) 
        await capacitacao.save()
        res.status(201).send(capacitacao._id)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.patch('/capacitacoes/:id', auth, permissao, async (req, res) => {
    const attributeNames = Object.keys(req.body)// ["nome", "isAdministrador"]
    try {
        const capacitacao = await Capacitacao.findById(req.params.id)
        if(!capacitacao)    
            return res.status(404).send("Capacitação não encontrada.")       
        attributeNames.forEach(attrName => capacitacao[attrName]= req.body[attrName])        
        await capacitacao.save()
        res.send(capacitacao)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.get('/capacitacoes',  async (req, res) => {
       try {
        const capacitacoes = await Capacitacao.find({})
        res.send(capacitacoes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve algum problema interno no servidor")
    }
})

router.delete('/capacitacoes/:id', auth, permissao, async (req, res) => {
    try {
        const capacitacao = await Capacitacao.findOneAndDelete({_id: req.params.id})
        if(!capacitacao)    
            return res.status(404).send("Capacitação não encontrada.")
        res.send(capacitacao)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

module.exports=router