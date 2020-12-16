const router = require('express').Router(); //obtenemos el router de express
const articuloController = require('../../controllers/ArticuloController')

// Manejo de rutas localhost:3000/api/articulo
//AGREGAR auth.verficarVendedor
router.get('/list',articuloController.list);
router.post('/add', articuloController.add);
router.put('/update',articuloController.update);
router.put('/activate',articuloController.activate);
router.put('/deactivate',articuloController.deactivate);


module.exports = router;
