// para pegarle a las rutas hay que ir a, por ejemplo, http://localhost:8080/api/productos/

const { Router } = require('express')
const { carritosRouter } = require('./carritos.route')
const { productosRouter } = require('./productos.route')
const apiRouter = Router()

// TODO modificar carritos por carrito
apiRouter.use("/productos", productosRouter)
apiRouter.use("/carritos", carritosRouter)

module.exports = {
    apiRouter
}