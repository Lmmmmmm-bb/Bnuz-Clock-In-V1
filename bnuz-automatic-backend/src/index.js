const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const index = new Koa()
const indexRoutes = require('./route/index')

index.use(cors()).use(bodyParser())
index.use(indexRoutes.routes())
index.use(indexRoutes.allowedMethods())

index.listen(4001, () => {
    console.log('Server listening port 4001')
})
