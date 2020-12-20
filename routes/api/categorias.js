const router = require('express').Router(); //obtenemos el router de express
const categoriaController = require('../../controllers/CategoriaController');
const auth = require('../../middlewares/auth');

// Manejo de rutas .com/api/auth
router.get('/list', auth.verificarVendedor, categoriaController.list);
router.post('/add', auth.verificarVendedor, categoriaController.add);
router.put('/update', auth.verificarVendedor, categoriaController.update);
router.put('/activate', auth.verificarVendedor, categoriaController.activate);
router.put('/deactivate', auth.verificarVendedor, categoriaController.deactivate);


module.exports = router;
