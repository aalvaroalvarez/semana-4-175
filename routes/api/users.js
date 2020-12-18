const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth');

const router = routerx();

// Manejo de rutas .com/api/usuario
router.get('/list', userController.list);
router.post('/add', auth.verificarAdministrador, userController.add);
router.put('/update', auth.verificarAdministrador, userController.update);
router.put('/activate',userController.activate);
router.put('/deactivate',userController.deactivate);

router.post('/login', userController.login);

module.exports = router;
