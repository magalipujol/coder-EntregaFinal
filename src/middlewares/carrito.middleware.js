const { productosModel } = require("../models/productos.model");
const { carritosModel } = require("../models/carritos.model");


const archivoProductos = new productosModel();
let allProducts;
archivoProductos.getProducts().then((data) => {
  allProducts = data;
});

const archivoCarritos = new carritosModel();
let allCarts;
archivoCarritos.getCarritos().then((data) => { allCarts = data; });

// TODO chequear que el producto exista en la base de datos
// no funciona, .find() al parecer no es una función, tal vez la línea 5 está mal
const productoExisteValidator = (req, res, next) => {
  const { productId } = req.params;
  const product = allProducts.find(
    (producto) => producto.id === Number(productId)
  );
  if (product) {
    next();
  } else {
    res.status(404).send(`El producto con id ${productId} no existe`);
  }
};

// TODO chequear que el producto no este repetido en el carrito
// no funciona, .find() al parecer no es una función, tal vez la línea 13 está mal
const productoRepetidoValidator = (req, res, next) => {
    const { productId } = req.params;
    const { carritoId } = req.params;
    const cart = allCarts.find((carrito) => carrito.id === Number(carritoId));
    const product = cart.productos.find(
        (producto) => producto.id === Number(productId)
    );
    if (product) {
        res.status(400).send(`El producto con id ${productId} ya existe en el carrito`);
    } else {
        next();
    }
}

module.exports = {
  productoExisteValidator,
  productoRepetidoValidator
};
