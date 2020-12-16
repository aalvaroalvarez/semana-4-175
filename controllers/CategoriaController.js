const jwt = require('jsonwebtoken');
const models = require('../models');

//Controlador route list - localhost:3000/api/categoria/list
exports.list = async (req, res, next) => {
    try {
        const registro = await models.Categoria.findAll();
        if (registro) {
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'No hay Categorías en el sistema.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route add - localhost:3000/api/categoria/add
exports.add = async (req, res, next) => {
    try {
        const registro = await models.Categoria.findOne({ where: { nombre: req.body.nombre } });
        if (!registro) {
            const registro = await models.Categoria.create(req.body);
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Categoría existente'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route update - localhost:3000/api/categoria/update
exports.update = async (req, res, next) => {
    try {
        const registro = await models.Categoria.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Categoria.update(
                { 
                    nombre: req.body.nombre, 
                    descripcion: req.body.descripcion 
                },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Categoría no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route activate - localhost:3000/api/categoria/activate
exports.activate = async (req, res, next) => {
    try {
        const registro = await models.Categoria.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Categoria.update({ estado: 1 },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Categoría no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route deactivate - localhost:3000/api/categoria/deactivate
exports.deactivate = async (req, res, next) => {
    try {
        const registro = await models.Categoria.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Categoria.update({ estado: 0 },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Categoría no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}