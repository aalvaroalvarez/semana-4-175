const jwt = require('jsonwebtoken');
const models = require('../models');

//Controlador route list - localhost:3000/api/articulo/list
// todo ok
exports.list = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).send({
            message: 'ERROR'
        })
        next(error);
    }
}
//Controlador route add - localhost:3000/api/articulo/add
//Controlador route update - localhost:3000/api/articulo/update
//Controlador route activate - localhost:3000/api/articulo/activate
//Controlador route deactivate - localhost:3000/api/articulo/deactivate