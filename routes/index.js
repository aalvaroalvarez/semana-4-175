const routerx = require('express-promise-router');
const apiRouterUser = require('./api/users');
const apiRouterCategoria = require('./api/categorias');
const apiRouterArticulo = require('./api/articulos');

const router = routerx();

router.use('/usuario', apiRouterUser); //.com/api/usuario
router.use('/categoria', apiRouterCategoria); //.com/api/categoria
router.use('/articulo', apiRouterArticulo); //.com/api/articulo

module.exports = router;