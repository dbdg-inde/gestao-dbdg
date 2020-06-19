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
module.exports=router