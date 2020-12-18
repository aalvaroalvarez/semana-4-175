const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth');

const router = routerx();

// Manejo de rutas .com/api/usuario
router.get('/list', userController.list);
router.post('/register', auth.verificarAdministrador, userController.register);
router.put('/update', auth.verificarAdministrador, userController.update);

router.post('/login', userController.login);

module.exports = router;
