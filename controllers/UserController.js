const bcrypt = require('bcryptjs');
const models = require('../models');
const tokenServices = require('../services/token')

//Controlador route signin - .com/api/usuario/login
exports.login = async (req, res, next) => {
    try {
        const user = await models.Usuario.findOne({ where: { email: req.body.email } });
        if (user) {
            // Validamos si la contraseña es igual
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
                const token = await tokenServices.encode(user);
                res.status(200).send({
                    // user,
                    auth: true,
                    tokenReturn: token
                });
            } else {
                res.status(401).send({
                    auth: false,
                    tokenReturn: null,
                    reason: "Invalid Password!"
                });
            }
        } else {
            res.status(404).send('User Not Found.');
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        })
        next(error);
    }
}

//Controller rouet list - .com/api/usuario/list
exports.list = async (req, res, next) => {
    try {
        const user = await models.Usuario.findAll();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({
                message: 'ERROR - No hay usuarios'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}

//Controller route register - .com/api/usuario/register
exports.add = async (req, res, next) => {
    try {
        // Validamos si existe el correo del usuario a registrar
        const user = await models.Usuario.findOne({ where: { email: req.body.email } });
        if (!user) {
            req.body.password = bcrypt.hashSync(req.body.password, 10); //Encripta contraseña
            const user = await models.Usuario.create(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).send({
                message: 'ERROR - email'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        })
        next(error);
    }
}

//Controller route update - .com/api/usuario/update
exports.update = async (req, res, next) => {
    try {
        // Validamos si existe el correo del usuario a registrar
        const user = await models.Usuario.findOne({ where: { email: req.body.email } });
        if (user) {
            const user = await models.Usuario.update(
                { 
                    nombre: req.body.nombre, 
                    email: req.body.email, 
                    rol: req.body.rol
                },
                {
                    where: {
                        email: req.body.email
                    }
                });
            res.status(200).json(user);
        } else {
            res.status(404).send({
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error'
        })
        next(error);
    }
};

//Controlador route activate - .com/api/usuario/activate
exports.activate = async (req, res, next) => {
    try {
        const registro = await models.Usuario.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Usuario.update({ estado: 1 },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route deactivate - .com/api/usuario/deactivate
exports.deactivate = async (req, res, next) => {
    try {
        const registro = await models.Usuario.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Usuario.update({ estado: 0 },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}