var jwt = require('jsonwebtoken');
const models = require('../models');

//Verifica posbiles errores con el token, al fallar en el try. Ejemplo, puede estar vencido
const checkToken = async (token) => {
    let localID = null;
    try {
        const { id } = token.decode(token);
        localID = id;
    } catch (error) {
        
    }
    const user =  await models.Usuario.findOne({where:{
        id : id,
        estado : 1
    }});
    if (user) {
        const token = enconde(user);
        return {
            token,
            rol: user.rol
        }
    } else {
        return false;
    }
}

module.exports = {
    encode: async(user)=>{
        const token = jwt.sign({
            id: user.id,
            name: user.nombre,
            email: user.email,
            rol: user.rol,
            status: user.estado
        }, 'config.secret', {
            expiresIn: 86400, //(seg) tiempo de vida token dura todo un día
        }
        );
        return token; //Retornamos el token
    },
    decode: async(token) => {
        try {
            //Verifica que sea un token válido, si es así se obtiene el id
            const { id } = await jwt.verify(token, 'config.secret');
            const user = await models.Usuario.findOne({where:{
                id : id,
                estado : 1
            }});
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (error) {
            const newToken = await checkToken(token); 
            return newToken;
        }
    }
}

//CÓDIGO POR DEFECTO DEL REPOSITORIO DE GITHUB
// module.exports = {

//     //generar el token
//     encode: async(id, rol) => {

//     },
//     //permite decodificar el token
//     decode: async(token) => {
//         try {

//         } catch (e) {

//         }

//     }
// }