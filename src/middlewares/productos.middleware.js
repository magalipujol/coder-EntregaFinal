const productPostValidator = (req, res, next) => {
    const {
        nombre,
        descripcion,
        foto,
        precio,
        stock,
        administrador
    } = req.body

    if (nombre && descripcion && foto && precio && stock && administrador) {
        next()
    } else {
        // TODO estaría bueno que te diga que campos faltan
        res.status(400).send("Faltan datos obligatorios para crear nuevo producto. Los campos válidos son: nombre, descripcion, foto, precio, stock y adminstrador")
    }
}

const validFieldsValidator = (req, res, next) => {
    const camposValidos = ["nombre", "descripcion", "foto", "precio", "stock", "administrador"]

    if (Object.keys(req.body).every(key => camposValidos.includes(key))) {
        next()
    } else {
        // TODO estaría bueno que te diga que campos son los que están mal
        res.status(400).send("Los campos válidos son: nombre, descripcion,foto, precio, stock y administrador")
    }
}

module.exports = {
    productPostValidator,
    validFieldsValidator
}