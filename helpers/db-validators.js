
const role = require('../models/role');
const Usuario = require('../models/usuario');

//Verifica los rol.
const esRoleValido = async(rol = '') => {
    const existeRol = await role.findOne({ rol });
    if( !existeRol){
        throw new Error(`EL rol ${rol} no está registrado en la BD`);
    }
}

//verifica si email existe
const emailExiste = async (correo = '') => {
    
    const existeEmail = await Usuario.findOne({correo})

    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

//verificar usuario por ID
const existeUsuarioPorId = async (id) => {
    
    const existeUsuario = await Usuario.findById(id)

    if (!existeUsuario) {
        throw new Error(`El id: ${id}, no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}