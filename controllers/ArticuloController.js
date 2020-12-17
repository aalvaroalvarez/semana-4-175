const jwt = require('jsonwebtoken');
const models = require('../models');

//Controlador route list - localhost:3000/api/articulo/list
exports.list = async (req, res, next) => {
    try {
        const registro = await models.Articulo.findAll({
            include: [
                {
                    model: models.Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre', 'descripcion']
                }
            ]
        });
        if (registro) {
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'No hay Artículos en el sistema.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route add - localhost:3000/api/articulo/add
//Mejorar la forma de validación del artículo existente
exports.add = async (req, res, next) => {
    try {
        const registro = await models.Articulo.findOne({ where: { nombre: req.body.nombre } });
        if (!registro) {
            const registro = await models.Articulo.create(req.body);
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Artículo existente'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route update - localhost:3000/api/articulo/update
exports.update = async (req, res, next) => {
    try {
        const registro = await models.Articulo.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Articulo.update(
                { 
                    codigo: req.body.codigo, 
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
                message: 'Artículo no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route activate - localhost:3000/api/articulo/activate
exports.activate = async (req, res, next) => {
    try {
        const registro = await models.Articulo.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Articulo.update({ estado: 1 },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Artículo no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route deactivate - localhost:3000/api/articulo/deactivate
exports.deactivate = async (req, res, next) => {
    try {
        const registro = await models.Articulo.findOne({ where: { id: req.body.id } });
        if (registro) {
            const registro = await models.Articulo.update({ estado: 0 },
                {
                    where: {
                        id: req.body.id
                    }
                });
            res.status(200).json(registro);
        } else {
            res.status(404).send({
                message: 'Artículo no encontrado'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}