const { Router } = require('express')
const { carritosModel } = require('../models/carritos.model')
const carritosRouter = Router()

const myCarts = new carritosModel()

carritosRouter.post("/", async (req, res) => {
    const wasCreated = await myCarts.createNewCart()

    wasCreated
        ? res.json(wasCreated)
        : res.status(500).send("No se pudo crear nuevo carrito")
})

carritosRouter.post("/:id/productos", async (req, res) => {
    const cartId = parseInt(req.params.id)
    const { productId } = req.body

    if (!cartId || !productId) {
        return res.status(400).send("Faltan datos para completar la operacion")
    }
    const wasAdded = await myCarts.addProductToCart(cartId, productId)

    wasAdded
        ? res.json(wasAdded)
        : res.status(500).send("No se pudo agregar el producto")
})


module.exports = {
    carritosRouter
}