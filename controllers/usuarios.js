
const { response, request } = require('express');




const usuariosGet = ( req=request, res = response) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey

    })
}
const usuariosPut = ( req=request, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'Put API - controlador',
        id
    })
}
const usuariosPost = ( req, res = response) => {

    const { nombre, edad} = req.body;

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    })
}
const usuariosDelete = ( req, res = response) => {
    
    const id = req.params.id;

    res.json({
        msg: 'Delete API - controlador',
        
    })
}
const usuariosPatch = ( req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}