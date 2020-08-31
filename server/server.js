require('./config/config') //al ser este el primer archivo lo primerp que hara el programa es hacer la configuracion dada en el archivo config

const express = require('express')
const mongoose = require('mongoose');

const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //los .use son middlewares los cuales se disparan cada vez que pase por ahi el codigo

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/usuario'))

mongoose.connect(process.env.urlDB,//ahora le pasamos la conexion de bbdd por variable  
    {useNewUrlParser:true, useCreateIndex:true},
    (err, res) => {
        if (err) throw err;
        console.log('base de datos ONLINE');
    }
);

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT); //ahora identifica el puerto segun la variable global establecida en el archivo config.js
})