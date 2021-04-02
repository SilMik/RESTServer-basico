const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
require('dotenv');

//middleware se dispara con 3 elementos: req, res, next
const validarJWT = async(req = request, res = response, next ) => {
    //leer el header
    const token = req.header('x-token');
    
    //si no viene el token
    if(!token) {
        return res.status(401).json({
            msg:'No hay token en la petición'
        });

    }
    try {
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        
        //leer al usuario que corresponde al uid.

        const usuario = await Usuario.findById( uid );

        //El usuario tiene que existir
        if(!usuario) {
            return res.status(401).json({
                msg:'Usuario no existe en DB'
            })
        }
        //Verificar si el uid tiene estado en true

        if (!usuario.estado){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }
    
        req.usuario = usuario;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido'
        })
    }
    console.log(token)
}

module.exports = {
    validarJWT
}