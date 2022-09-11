const { writeFile, readFile } = require('fs').promises

// TODO arreglar los productos para que tengan que ver con mis gustos en el json
class productosModel {
    constructor() {
        this.fileName = './src/models/productos.model.json'
    }

    //guarda la DB retornar true / false
    async _saveProducts(productsDB) {
        try {
            const stringData = JSON.stringify(productsDB)
            await writeFile(this.fileName, stringData)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    //devuelve la DB si no existe archivo devuelve nueva DB
    async _readProducts() {
        try {
            const stringProducts = await readFile(this.fileName, 'utf-8')
            const parsedProducts = JSON.parse(stringProducts)
            return parsedProducts
        } catch (error) {
            const dataBase = {
                nextId: 1,
                productsList: []
            }
            this._saveProducts(dataBase)
            return dataBase
        }
    }

    async createProduct(newProduct) {
        // TODO cambiar la manera de obtener el id
        const productsDB = await this._readProducts()
        const id = productsDB.nextId
        productsDB.nextId++
        const timestamp = Date.now()
        const codigo = newProduct.nombre + timestamp
        newProduct.stock = newProduct.stock || 1

        const completeNewProduct = {
            ...newProduct,
            id,
            timestamp,
            codigo
        }

        productsDB.productsList.push(completeNewProduct)
        const wasCreated = await this._saveProducts(productsDB)
        if (wasCreated) return completeNewProduct
        return wasCreated
    }

    async getProducts() {
        const { productsList } = await this._readProducts()
        return productsList
    }

    async getProductById(productId) {
        const { productsList } = await this._readProducts()
        const product = productsList.find(product => product.id === productId)
        return product
    }

    async updateProduct(productId, newData) {
        const productDB = await this._readProducts()
        const { productsList } = productDB
        const product = productsList.find(product => product.id === productId)

        // este chequeo sirve para que solo se modifiquen los campos que se envian
        // si vienen propiedades extras, las va a crear
        // TODO arreglar que las propiedades extras no se agreguen
        if (product) {
            Object.keys(newData).forEach(key => {
                product[key] = newData[key]
            })
        } else return false

        const wasUpdated = await this._saveProducts(productDB)
        if (wasUpdated) return product
        return wasUpdated
    }

    async deleteProduct(productId) {
        const productsDB = await this._readProducts()
        const { productsList } = productsDB
        const index = productsList.findIndex(product => product.id === productId)

        if (index >= 0) {
            productsList.splice(index, 1)
            const wasSaved = await this._saveProducts(productsDB)
            return wasSaved
        }

        return false
    }
}

module.exports = {
    productosModel
}