const { Router } = require('express')
const { productPostValidator } = require('../middlewares/productos.middleware')
const { authValidator } = require('../middlewares/auth.middleware')
const productosRouter = Router()
const { productosModel } = require('../models/productos.model')

const myProducts = new productosModel()

productosRouter.post("/", authValidator, productPostValidator, async (req, res) => {
    const newProduct = req.body

    try {
        const result = await myProducts.createProduct(newProduct)
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

productosRouter.get("/:id?", (req, res) => {
    const { id } = req.params

    if (id) {
        myProducts.getProductById(Number(id))
            .then(product => {
                product
                    ? res.json(product)
                    : res.status(404).send("Producto no encontrado")
            })

    } else {
        myProducts.getProducts()
            .then(data => res.json(data))
    }
})

productosRouter.put("/:id", authValidator, async (req, res) => {
    const productId = parseInt(req.params.id)
    const newData = req.body

    const updatedProduct = await myProducts.updateProduct(productId, newData)

    updatedProduct
        ? res.json(updatedProduct)
        : res.status(404).send("Producto no encontrado")
})

productosRouter.delete("/:id", authValidator, async (req, res) => {
    const { id } = req.params

    const wasDeleted = await myProducts.deleteProduct(Number(id))

    wasDeleted
        ? res.send("Producto eliminado")
        : res.status(404).send("Producto inexistente")
})

module.exports = {
    productosRouter
}