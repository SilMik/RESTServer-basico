
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next ) => {
    //errores creados por el express validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    //Si llega a este punto, continue con el siguiente middleware
    next();
}

module.exports = {
    validarCampos
}