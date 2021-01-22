const express = require('express')
const Documentacao = require('./../models/documentacao')
const router = express.Router()
const auth = require('./../middlewares/auth.js')
const permissao = require('./../middlewares/permissao.js')
router.get('/documentacoes', async (req,res) => {
    try {
        const documentacoes = await Documentacao.find({})
        res.send(documentacoes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Houve algum problema interno no servidor')
    }
    
})

router.post('/documentacoes', async (req, res) => {    
    const documentacao = new Documentacao(req.body)
    try {
        await documentacao.save()
        return res.status(201).send(documentacao._id)
        res.send(documentacoes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Não foi possível criar a documentação")
    }
})

router.patch('/documentacoes/:id', auth, permissao, async (req, res) => {
    const attributeNames = Object.keys(req.body)// ["nome", "isAdministrador"]    
    try {
        const documentacao = await Documentacao.findById(req.params.id)        
        if(!documentacao)    
            return res.status(404).send("Documentação não encontrado.")
        attributeNames.forEach(attrName => documentacao[attrName]= req.body[attrName])
        await documentacao.save()
        res.send(documentacao)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.delete('/documentacoes/:id', auth, permissao, async (req, res) => {
    try {
        const documentacao = await Documentacao.findOneAndDelete({_id: req.params.id})
        if(!documentacao)    
            return res.status(404).send("Documentação não encontrada.")
        res.send(documentacao)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

module.exports = router