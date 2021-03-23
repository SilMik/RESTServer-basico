const express = require('express');
const cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //saber las rutas
        this.usuariosPath = '/api/usuarios'

        //middlewares
        this.middlewares();

        //rutas aplicación
        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y parse del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use( express.static('public') )
    }
    /*Metodo para las rutas*/ 
    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}


module.exports = Server;