
const { response, request } = require('express');

const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = async( req=request, res = response) => {

    //const { q, nombre, apikey } = req.query;

    

    //desestructurar para el argume,l,m nto limite. Si no viene dejar vista de 5. 
    const { limite = 5, desde = 0 } = req.query;
    
    // //get de todos los usuarios y solo muestra los con estado activo /true
    // const usuarios = await Usuario.find({estado: true})
    //     .skip(Number(desde))
    //     .limit(Number(limite)); //se podría verificar si el limite o desde es un numero 

    // //Muestra todos los registros(cantidad) que tienen estado activo
    // const total = await Usuario.countDocuments({estado: true});

    //Lo anterior trabajado como promesas, para no tener tanta espera
    //entre cada proceso.

    //desestrocturación de arreglos para que se muestre con los nombres.
    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true}),
        Usuario.find({estado: true})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios    
    })
}
const usuariosPost = async ( req, res = response) => {
  
    const { nombre, correo, password, rol } = req.body;
    const usuario = Usuario({nombre, correo, password, rol});

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);
    
    //guardar en base de datos
    await usuario.save();

    res.json({
        msg: 'Post API - controlador',
        usuario
    })
}

const usuariosPut = async( req=request, res = response) => {

    const { id } = req.params;
    //se extra el _id si es que viene junto con password, google y correo
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: validad contra base de datos
    if (password){
         //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    //actualiza el registro
    const usuarioDB = await Usuario.findByIdAndUpdate( id, resto );


    res.json(usuarioDB)
}
const usuariosDelete = async( req, res = response) => {
    
    const {id} = req.params;


    // const uid = req.uid;

    //Borrar fisicamente el registro
    // const usuario = await Usuario.findByIdAndDelete( id )
    // res.json(usuario)

    //Borrando cambiadno el estado. 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    // acá se envia el usuario autenticado
    //const usuarioAutenticado = req.usuario;

    res.json(usuario); //  usuario, usuarioAutenticado para ver qué usuario es. 
}


const usuariosPatch = ( req, res = response) => {
    
    
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}