/* Como se mostrarán los datos
{
    nombre: '',
    correo: ,
    password: ,
    img: '',
    rol:
    estado: true/false
    google: true //creado por sistema de autenticación

}*/

const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//sobreescribir el tojson
UsuarioSchema.methods.toJSON = function() {
    //Sacar "algo" del this.tobject porque hace referencia a la instancia
    //sacara la version y el password al usar el toJSON y el resto de argumentos
    //los dejara en usuario
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

//se exporta el model donde se pide el nombre y se coloca el nombre a la
//colección y se pide el Schema. 
module.exports = model( 'Usuario', UsuarioSchema );
