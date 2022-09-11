const { writeFile, readFile } = require('fs').promises
// TODO arreglar para que tenga que ver con mis gustos
class carritosModel {
    constructor() {
        this.fileName = './src/models/carritos.model.json'
    }

    //guarda la DB retornar true / false
    async _saveCarts(cartsDB) {
        try {
            const stringData = JSON.stringify(cartsDB)
            await writeFile(this.fileName, stringData)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    //devuelve la DB si no existe archivo devuelve nueva DB
    async _readCarts() {
        try {
            const stringCarts = await readFile(this.fileName, 'utf-8')
            const parsedCarts = JSON.parse(stringCarts)
            return parsedCarts
        } catch (error) {
            const dataBase = {
                nextId: 1,
                cartsList: []
            }
            this._saveCarts(dataBase)
            return dataBase
        }
    }

    assignId = (productos) => {
        let id = 1;
        if (productos.length > 0) {
          id = productos[productos.length - 1].id + 1;
        }
        return id;
      };

    async createNewCart() {
        const cartDB = await this._readCarts()
        const id = this.assignId(cartDB.cartsList);
        const timestamp = Date.now()
        const newCart = {
            id: id,
            timestamp: timestamp,
            productos: []
        }
        cartDB.cartsList.push(newCart)
        const wasCreated = await this._saveCarts(cartDB)
        if (wasCreated) {
            return newCart
        }
        return false
    }

    // TODO cambiar cantidad por stock
    async addProductToCart(cartId, productId) {
        const cartDB = await this._readCarts()
        const { cartsList } = cartDB
        const cart = cartsList.find(cart => cart.id === cartId)

        if (cart) {
            const producto = cart.productos.find(producto => producto.productId === productId)
            if (producto) {
                producto.cantidad++
            } else {
                const newProduct = {
                    productId,
                    cantidad: 1
                }
                cart.productos.push(newProduct)
            }
            const wasSaved = await this._saveCarts(cartDB)
            if (wasSaved) return cart.productos
        }
        return false
    }

    async deleteProductFromCart(cartId, productId) {
        const cartDB = await this._readCarts()
        const { cartsList } = cartDB
        const cart = cartsList.find(cart => cart.id === cartId)

        if (cart) {
            const producto = cart.productos.find(producto => producto.productId === productId)
            if (producto) {
                const index = cart.productos.indexOf(producto)
                cart.productos.splice(index, 1)
                const wasSaved = await this._saveCarts(cartDB)
                if (wasSaved) return cart.productos
            }
        }
        return false
    }

    async deleteCart(cartId) {
        const cartDB = await this._readCarts()
        const { cartsList } = cartDB
        const cart = cartsList.find(cart => cart.id === cartId)

        if (cart) {
            const index = cartsList.indexOf(cart)
            cartsList.splice(index, 1)
            const wasSaved = await this._saveCarts(cartDB)
            if (wasSaved) return true
        }
        return false
    }
}


module.exports = {
    carritosModel
}