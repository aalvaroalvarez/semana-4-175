//Middleware de autenticacion, valida si un usuario tiene permisos para realizar una acción;
const tokenServices = require('../services/token');

module.exports = {
    //validación para rol administrador
    verificarAdministrador: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }
        //si existen el token, decodificamos y verificamos el rol
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol === 'Administrador') {
            next();
        } else {
            return res.status(403).send({
                message: 'Usuario no autorizado'
            });
        }
    },
    //validación para rol administrador
    verificarVendedor: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol === 'Administrador' || response.rol === 'Vendedor') {
            next();
        } else {
            return res.status(403).send({
                message: 'Usuario no autorizado'
            });
        }
    },
    //CÓDIGO POR DEFECTO DEL REPOSITORIO DE GITHUB
    verifyUsuario: async(req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'No token'
            });
        }
        const response = await tokenServices.decode(req.headers.token);
        if (response.rol == 'Administrador' || response.rol == 'Vendedor' || response.rol == 'Almacenero') {
            next();
        } else {
            return res.status(403).send({
                message: 'No autorizado'
            });
        }
    },

}