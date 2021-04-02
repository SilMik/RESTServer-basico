

const esAdminRole = (req, res, next) => {



    //validar para saber si estamos llamando bien el ADMIN
    if( !req.usuario) {
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero'
        })
    }
    
    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`${nombre} no es administrador - No puede hacer esto `
        });
    }

    next();

}

// se le quiere enviar ADMIN_ROLE y VENTAS_ROLE
const tieneRole = (...roles) => {

    return (req, res, next) => {
        if( !req.usuario) {
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el token primero'
            })
        }
        //si no está includo
        if( !roles.includes( req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio require uno de estos roles ${roles}`
            })
        }

        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}