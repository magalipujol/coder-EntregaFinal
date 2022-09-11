# Proyecto final para curso de backend de Coderhouse

## Descripcion
La consigna es crear el backend de un e-commerce. Un servidor con un CRUD de productos y carritos, con funcionalidades a las que puedan acceder los usuarios y los administradores.

## Tecnologias
- Node.js
- Express

## Instalacion
Para correr la aplicación, primero instalar las dependencias con `npm install` y luego correr el servidor con `npm start`.

## Endpoints
### Productos
- GET /api/productos - devuelve todos los productos
- GET /api/productos/:id - devuelve el producto con el id especificado
- POST /api/productos - crea un producto (solo admin)
- PUT /api/productos/:id - actualiza el producto con el id especificado (solo admin)
- DELETE /api/productos/:id - elimina el producto con el id especificado (solo admin)
### Carritos
- GET /api/carrito/:id/productos - devuelve todos los productos del carrito con el id especificado
- POST /api/carrito - crea un carrito
- POST /api/carrito/:id/productos - agrega un producto al carrito con el id especificado
- DELETE /api/carrito/:id - elimina el carrito con el id especificado
- DELETE /api/carrito/:id/productos/:id - elimina el producto con el id especificado del carrito con el id especificado

