const express = require('express')
const Representante = require('./../models/representante')
const router = express.Router()
const auth = require('./../middlewares/auth.js')
const permissao = require('./../middlewares/permissao.js')


router.post('/representantes', auth, permissao, async (req, res) => {

    try {
        const representante = new Representante(req.body)
        await representante.save()
        res.status(201).send(representante._id)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.patch('/representantes/:id', auth, permissao, async (req, res) => {
    const attributeNames = Object.keys(req.body)// ["nome", "isAdministrador"]
    try {
        const representante = await Representante.findById(req.params.id)
        if (!representante)
            return res.status(404).send("Representante não encontrado.")
        attributeNames.forEach(attrName => representante[attrName] = req.body[attrName])
        await representante.save()
        res.send(representante)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

router.get('/representantes', async (req, res) => {
    try {
        const representantes = await Representante.find({})
        res.send(representantes)
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve algum problema interno no servidor")
    }
})

router.get('/representantes/:_id', async (req, res) => {
    try {
        const representante = await Representante.findById(req.params._id)
        if(!representante)
            return res.status(404).send("Representante não encontrado")
        res.send(representante)            
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve algum problema interno no servidor")
    }
})

router.delete('/representantes/:id', auth, permissao, async (req, res) => {
    try {
        const representante = await Representante.findOneAndDelete({_id: req.params.id})
        if(!representante)    
            return res.status(404).send("Representante não encontrado.")
        res.send(representante)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})

module.exports = router