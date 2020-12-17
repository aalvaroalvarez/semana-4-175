const router = require('express').Router(); //obtenemos el router de express
const categoriaController = require('../../controllers/CategoriaController')

// Manejo de rutas .com/api/auth
router.get('/list',categoriaController.list);
router.post('/add', categoriaController.add);
router.put('/update',categoriaController.update);
router.put('/activate',categoriaController.activate);
router.put('/deactivate',categoriaController.deactivate);


module.exports = router;
