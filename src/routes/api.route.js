const { Router } = require('express')
const { carritosRouter } = require('./carritos.route')
const { productosRouter } = require('./productos.route')
const apiRouter = Router()

apiRouter.use("/productos", productosRouter)
apiRouter.use("/carritos", carritosRouter)

module.exports = {
    apiRouter
}