const express = require('express');
require('dotenv').config();
const cors = require('cors');
const process = require('process');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    method: 'GET, POST, PUT, DELETE',
    credentials: true,
}

app.use(cors(corsOptions));

const yaml = require('yamljs');


const swaggerUi = require('swagger-ui-express');

const OpenApiValidator = require('express-openapi-validator');

const apiSpec = yaml.load('./api_specs.yaml');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(apiSpec));

const validator = OpenApiValidator.middleware({

    apiSpec: './api_specs.yaml',
    validateRequests: true,
    validateRespoonses: true,
});

app.use(validator);


app.use((err, req, res, next) => { //gestione degli errori di openapi validator

    console.error(`Errore su ${req.method} ${req.path} : ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });

});

app.use((req, res, next) => { //log delle richieste
    console.log(`${req.method} ${req.path} dal client ${req.ip} con porta ${req.socket.remotePort}`);
    next();
});



const routes = require('./routes/index.js');

///////////////////////////////////
// Routes for components
///////////////////////////////////


app.use(routes.chipsets);
app.use(routes.cpus);
app.use(routes.storage_lengths);
app.use(routes.types_ram);
app.use(routes.psu);
app.use(routes.gpus);
app.use(routes.cpu_coolers);
app.use(routes.cases);
app.use(routes.storage);
app.use(routes.ram);
app.use(routes.motherboards);
app.use(routes.QVL);

///////////////////////////////////
// Routes for builds
///////////////////////////////////
app.use(routes.builds);
app.use(routes.user_builds);

///////////////////////////////////
// Routes for users
///////////////////////////////////
app.use(routes.users);





app.listen(port,() => {
    console.log(`server listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
    const connection = require('./db/connection.js');
    try {
        connection.end();
        console.log('connection closed');
    }catch (e) {
        console.error(e);
    }

    process.exit();
});


