const  express = require('express')
const app = express()
const port = 3005
process.env.JWTSECRET="meusegredo"
app.use(express.json())

require('./db/dbMongoose')
const usuarioRouter = require('./routers/usuario')
const atorRouter = require('./routers/ator')
const capacitacaoRouter = require('./routers/capacitacao')
const documentacaoRouter = require('./routers/documentacao')
const representanteRouter = require('./routers/representante')
const historicoRouter = require('./routers/historico')

app.use(capacitacaoRouter)
app.use(usuarioRouter)
app.use(atorRouter)
app.use(documentacaoRouter)
app.use(representanteRouter)
app.use(historicoRouter)


app.all('*', async (req, res)=> {
    res.status(404).send("Recurso não encontrado.")
})
app.listen(port, ()=> {
    console.log(`Executando na porta: ${port}`)
})
