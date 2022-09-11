const productPostValidator = (req, res, next) => {
    const {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
    } = req.body

    if (nombre && descripcion && codigo && foto && precio) {
        next()
    } else {
        res.status(400).send("Faltan datos obligatorios para crear nuevo producto")
    }
}

module.exports = {
    productPostValidator
}