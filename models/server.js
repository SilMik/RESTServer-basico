const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //saber las rutas
        this.usuariosPath = '/api/usuarios'

        //Conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    //middlewares
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