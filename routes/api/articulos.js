const router = require('express').Router(); //obtenemos el router de express
const articuloController = require('../../controllers/ArticuloController');
const auth = require('../../middlewares/auth');

// Manejo de rutas .com/api/articulo
router.get('/list',articuloController.list);
router.post('/add', auth.verificarVendedor, articuloController.add);
router.put('/update', auth.verificarVendedor, articuloController.update);
router.put('/activate', auth.verificarVendedor, articuloController.activate);
router.put('/deactivate', auth.verificarVendedor, articuloController.deactivate);


module.exports = router;
