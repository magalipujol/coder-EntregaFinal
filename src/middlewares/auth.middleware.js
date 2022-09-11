const authValidator = (req, res, next) => {
    const { administrador } = req.body
    console.log(administrador);
    if (administrador) {
        next()
    } else {
        res.status(401).send("Solo accesible para administradores")
    }
}

module.exports = {
    authValidator
}