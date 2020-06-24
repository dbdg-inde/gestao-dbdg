const express = require('express')
const Documentacao = require('./../models/documentacao')
const router = express.Router()
const auth = require('./../middlewares/auth.js')
const permissao = require('./../middlewares/permissao.js')

router.get('/documentacoes', async (req, res) => {
    try {
        return res.send(await Documentacao.find({}))   
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
    
})
router.post('/documentacoes', async (req, res) => {
    
    const documentacao = new Documentacao(req.body)
    try {
        await documentacao.save()
        return res.status(201).send(documentacao._id)
    } catch (error) {
        console.log(error)
        res.status(500).send("Não foi possível criar o usuário")
    }
})
/*router.patch('/usuarios/me', auth, async (req, res) => {
    const novaSenha = req.body.password
    try {
        req.usuario.password = novaSenha
        await req.usuario.save()
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.patch('/usuarios/:id', auth, permissao, async (req, res) => {
    const attributeNames = Object.keys(req.body)// ["nome", "isAdministrador"]
    try {
        const usuario = await Usuario.findById(req.params.id)
        if(!usuario)    
            return res.status(404).send("Usuário não encontrado.")
        attributeNames.forEach(attrName => usuario[attrName]= req.body[attrName])
        await usuario.save()
        res.send(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.delete('/usuarios/me', auth, async (req, res)=>{
    try {
        await req.usuario.remove()
        res.send("Perfil excluído")    
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})
router.delete('/usuarios/:id', auth, permissao, async (req, res) => {
    try {
        const usuario = await Usuario.findOneAndDelete({_id: req.params.id})
        if(!usuario)    
            return res.status(404).send("Usuário não encontrado.")
        res.send(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})
router.get('/usuarios/me', auth , async (req, res) =>{
    res.send(req.usuario)
})
router.get('/usuarios',  async (req, res) => {
    try {
        const usuarios = await Usuario.find({})
        res.send(usuarios)
    } catch (error) {
        console.log(error)
        res.status(500).send("Houve algum problema interno no servidor")
    }
})
router.post('/usuarios/login', async (req, res) => {
    try {
        const usuario = await Usuario.findByCredentials(req.body.email, req.body.password)
        if(!usuario)
            return res.status(404).send("Usuário não encotrado")
        const token = await usuario.gerarToken()
        res.status(201).send({usuario: usuario, token: token})    
    } catch (error) {
        console.log(error)
        res.status(403).send(error.message)
    }
})
*/
module.exports = router