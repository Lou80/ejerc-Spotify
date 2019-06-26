const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./router');
//aqui requiero el archivo de rutas

app.use( cors() );
app.use( express.json() );
app.use('/', router);
//app.use significa cualquier método creado en router
//la barra sola significa todas las rutas creadas en router

app.listen(4003);
