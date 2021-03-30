const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( esRoleValido ), //puede o no actualizarse el rol
    validarCampos
], usuariosPut );

// ruta, middleware, controlador
//si envian varios middlewares se envian como arreglos
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Debe ser minimo de 6 caracteres').isLength({ min: 5 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste),
    //Validar sin base de datos
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE'])
    //Validar con base de datos
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPost );

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;