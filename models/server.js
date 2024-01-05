const express = require('express')
require('dotenv').config();
const cors = require('cors');


const { dbConection } = require('../database/db.js')


class Server {

    constructor() {
        this.app = express();
        this.port = 4001;
        this.userRoutesPath = '/api/questions';
        this.authRoutesPath = '/api/auth/';
        this.createQ = '/api/create/questions';
    //   DB
        this.connectDB();
          // middlewares
        this.middlewares();
        // rutas
        this.routes();
    }
    async connectDB(){
        await dbConection()    
    }

    middlewares(){
        // parse y lectura de la info que viene en el body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // cors
        this.app.use( cors());
        // directorio publico, contenido html
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.userRoutesPath, require('../routes/question.router.js'));
        this.app.use(this.authRoutesPath, require('../routes/auth.router.js'));
        this.app.use(this.createQ, require('../routes/createQuestion.router.js'));
    }

    listen(){
        this.app.listen(this.port || process.env.PORT, () => {
            console.log(` app listening on port ${this.port}`)
          })
    }

}


module.exports = Server;