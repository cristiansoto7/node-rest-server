require('./config/config') //al ser este el primer archivo lo primerp que hara el programa es hacer la configuracion dada en el archivo config

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { request } = require('express')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //los .use son middlewares los cuales se disparan cada vez que pase por ahi el codigo

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) { //para obtener datos
    res.json('get usuario') //cambiamos el res.send (html), por res.json para que haga req y resp de datos json
})

app.post('/usuario', function(req, res) { //peticion post se usa para enviar y en consecuencia crear nuevos registros

    let body = req.body //la variable body va a recibir cualquier request que procese el bodyparser, funciona igual para todas las peticiones http

    if (body.nombre === undefined) { //mandaremos un status code si es q no recibe ningun nombre
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        })
    } else {

        res.json({ //el body se lo envio por request en el postman
            persona: body //devuelve el body obtenido por el request, el json se llamara persona
        })

    }



})

app.put('/usuario/:id', function(req, res) { //el put para actualizar los datos o registros
    let id = req.params.id; //toma el id de la ruta especificada en el put
    res.json({ //retorna lo que sea que obtenga del url
        id
    })
})

app.delete('/usuario', function(req, res) { //el delete para desabilitar los datos o registros, no los borra realmente
    res.json('delete usuario')
})

app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.PORT); //ahora identifica el puerto segun la variable global establecida en el archivo config.js
})