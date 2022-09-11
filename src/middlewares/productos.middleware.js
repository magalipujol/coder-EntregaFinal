const productPostValidator = (req, res, next) => {
    const {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    } = req.body

    if (nombre && descripcion && codigo && foto && precio && stock) {
        next()
    } else {
        // TODO estaría bueno que te diga que campos faltan
        res.status(400).send("Faltan datos obligatorios para crear nuevo producto. Los campos válidos son: nombre, descripcion, codigo, foto, precio y stock")
    }
}

const validFieldsValidator = (req, res, next) => {
    const camposValidos = ["nombre", "descripcion", "codigo", "foto", "precio", "stock"]

    if (Object.keys(req.body).every(key => camposValidos.includes(key))) {
        next()
    } else {
        // TODO estaría bueno que te diga que campos son los que están mal
        res.status(400).send("Los campos válidos son: nombre, descripcion, codigo, foto, precio y stock")
    }
}

module.exports = {
    productPostValidator,
    validFieldsValidator
}