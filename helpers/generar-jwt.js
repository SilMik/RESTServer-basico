
const jwt = require('jsonwebtoken');

//el uid es lo unico que se almacenara en el payload del jwt. 
//no guardar información sensible en el jwt
const generarJWT = (uid) => {
    return new Promise( (resolve, reject) =>{

        //generando el jwt
        const payload = {uid};

        //firma un nuevo token
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) =>{
            if( err ) {
                reject( 'No se pudo generar el token')
            }else{
                resolve( token );
            }
        } );


    })
}


module.exports = {
    generarJWT
}