const { Router } = require('express')
const { productPostValidator, validFieldsValidator } = require('../middlewares/productos.middleware')
const { authValidator } = require('../middlewares/auth.middleware')
const productosRouter = Router()
const { productosModel } = require('../models/productos.model')

const myProducts = new productosModel()

productosRouter.post("/", authValidator, productPostValidator, validFieldsValidator, async (req, res) => {
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

    }
    // están hechos juntos el get para todos y el get por id
    // TODO separarlos
    else {
        myProducts.getProducts()
            .then(data => res.json(data))
    }
})

productosRouter.put("/:id", authValidator, validFieldsValidator, async (req, res) => {
    const productId = parseInt(req.params.id)
    const newData = req.body

    const updatedProduct = await myProducts.updateProduct(productId, newData)

    updatedProduct
        ? res.json(updatedProduct)
        : res.status(404).send("Producto no encontrado")
})

// para borrar un producto hay que ser administrador, y en el body se le debe pasar {"administrador": true}
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