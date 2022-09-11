
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
  const camposValidos = [
    "nombre",
    "descripcion",
    "foto",
    "precio",
    "stock",
    "administrador",
  ];

  if (Object.keys(req.body).every((key) => camposValidos.includes(key))) {
      next();
    } else {
        // TODO estaría bueno que te diga que campos son los que están mal
    res
    .status(400)
      .send(
        "Los campos válidos son: nombre, descripcion,foto, precio, stock y administrador"
        );
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
