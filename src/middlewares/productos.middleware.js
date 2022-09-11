
const productPostValidator = (req, res, next) => {
  const { nombre, descripcion, foto, precio, stock, administrador } = req.body;

  if (nombre && descripcion && foto && precio && stock && administrador) {
    next();
  } else {
    const camposFaltantes = getDifferences(camposValidos, Object.keys(req.body));
    res
      .status(400)
      .send(
        `Faltan campos. Los campos faltantes son: ${camposFaltantes.join(", ")}`
      );
  }
};

const validFieldsValidator = (req, res, next) => {
  if (Object.keys(req.body).every((key) => camposValidos.includes(key))) {
      next();
    } else {
        const camposInvalidos = getDifferences(Object.keys(req.body), camposValidos);
    res
    .status(400)
      .send(`Campos inválidos. Los campos inválidos son: ${camposInvalidos.join(", ")}`);
    }
};

// variables y funciones auxiliares
let camposValidos = [
  "nombre",
  "descripcion",
  "foto",
  "precio",
  "stock",
  "administrador",
];

function getDifferences(arr1, arr2) {
  return arr1.filter((x) => !arr2.includes(x));
}

module.exports = {
  productPostValidator,
  validFieldsValidator,
};
