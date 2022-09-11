// TODO la consigna lo pide de otra manera
const authValidator = (req, res, next) => {
    // el booleano se envía en el body
    const { administrador } = req.body
    console.log(administrador);
    if (administrador) {
        next()
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = {
    authValidator
}