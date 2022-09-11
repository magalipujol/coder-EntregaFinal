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

carritosRouter.get("/:id/productos", async (req, res) => {
    const cartId = parseInt(req.params.id)

    if (!cartId) {
        return res.status(400).send("Faltan datos para completar la operacion")
    }
    const carts = await myCarts._readCarts()
    const cart = carts.cartsList.find(cart => cart.id === cartId)

    cart
        ? res.json(cart)
        : res.status(500).send("No se pudo obtener el carrito")
})

carritosRouter.delete("/:id/productos/:productId", async (req, res) => {
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.params.productId)

    if (!cartId || !productId) {
        return res.status(400).send("Faltan datos para completar la operacion")
    }
    const wasDeleted = await myCarts.deleteProductFromCart(cartId, productId)

    wasDeleted
        ? res.json(wasDeleted)
        : res.status(500).send("No se pudo eliminar el producto")
})

carritosRouter.delete("/:id", async (req, res) => {
    const cartId = parseInt(req.params.id)

    if (!cartId) {
        return res.status(400).send("Faltan datos para completar la operacion")
    }
    const wasDeleted = await myCarts.deleteCart(cartId)

    wasDeleted
        ? res.json(wasDeleted)
        : res.status(500).send("No se pudo eliminar el carrito")
})

module.exports = {
    carritosRouter
}