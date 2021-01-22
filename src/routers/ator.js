const express = require('express')
const Ator = require('./../models/ator')
const router = express.Router()
const auth = require('./../middlewares/auth.js')
const permissao = require('./../middlewares/permissao.js')
router.post('/atores',auth, permissao, async (req, res) =>{
    
     try {
        const ator = new Ator(req.body) 
        await ator.save()
        res.status(201).send(ator._id)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.patch('/atores/:id', auth, permissao, async (req, res) => {
    const attributeNames = Object.keys(req.body)// ["nome", "isAdministrador"]
    try {
        const ator = await Ator.findById(req.params.id)
        if(!ator)    
            return res.status(404).send("Ator não encontrado.")       
        attributeNames.forEach(attrName => ator[attrName]= req.body[attrName])        
        await ator.save()
        res.send(ator)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.get('/atores',  async (req, res) => {
       try {
        const atores = await Ator.find({})
        res.send(atores)
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve algum problema interno no servidor")
    }
})
router.get('/atores/:_id/documentacoes',  async (req, res) => {
    try {
        console.log(req.params.id)
     const ator = await Ator.findById(req.params._id)
     res.send(await ator.documentacoes())

 } catch (error) {
     console.log(error)
     res.status(500).send("Houve algum problema interno no servidor")
 }
})

router.delete('/atores/:id', auth, permissao, async (req, res) => {
    try {
        const ator = await Ator.findOneAndDelete({_id: req.params.id})
        if(!ator)    
            return res.status(404).send("Ator não encontrado.")
        res.send(ator)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

module.exports=router