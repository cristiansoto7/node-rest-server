const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const { query } = require('express')


const app = express()


app.get('/usuario', function(req, res) { //para obtener datos
    let desde = req.query.desde || 0 //si es que se recibe un query sera desde ese valor, sino sera desde el inicio (0)
    desde = Number(desde) //parseamos la variable recibida a int
    let limite = req.query.limite || 5
    limite = Number(limite)
    Usuario.find({estado:true}, 'nombre email role estado google img') //encuentra los usuarios en la colleccion y le especificamos los campos que queremos que encuentre, sin comas
        .skip(desde) //se salta los primeros registros pasados por la variable "desde"
        .limit(limite) //devuelve los siguientes 5 registros
        .exec((err, usuarios) => { //podemos recibir un error o un arreglo de usuarios
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            } else {
                Usuario.count({estado:true}, (err, conteo) => { //hace un conteo de los registros en la coleccion
                    res.json({ //lo que queremos regresar
                        ok: true,
                        usuarios, //es lo mismo que usuarios:usuarios
                        cuantos: conteo
                    })
                })
            }
        })


    //res.json('get usuario') //cambiamos el res.send (html), por res.json para que haga req y resp de datos json
})

app.post('/usuario', function(req, res) { //peticion post se usa para enviar y en consecuencia crear nuevos registros
    let body = req.body
    let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10), //encriptamos la contraseña, hashsync para q lo haga automaticamente
            role: body.role,
            estado: body.estado
        }) //aca crea una nueva instancia del esquema usuario definido en models/usuario

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {
            //suarioDB.password = null //anulamos la contraseña para no mostrarla como request
            res.json({ //el body se lo envio por request en el postman
                ok: true,
                usuario: usuarioDB //devuelve el body obtenido por el request, el json se llamara persona
            })
        }
    })
})

app.put('/usuario/:id', function(req, res) { //el put para actualizar los datos o registros
    let id = req.params.id; //toma el id de la ruta especificada en el put
    let body = _.pick(req.body, [nombre, img, role, estado]) //la variable body va a recibir cualquier request que procese el bodyparser, funciona igual para todas las peticiones http
        //usamos la propiedad pick del underscore la cual le decimos cuales son los campos que podremos actualizar con el put.
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { //el new se utiliza para que cuando se usa el put este ademas de cambiar el registro devuelva el nuevo registro
        //usamos el runvalidators: true para que use las validaciones que definimos en el schema
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({ //retorna lo que sea que obtenga del url
                ok: true,
                usuario: usuarioDB
            })
        }
    })
})

app.delete('/usuario/:id', function(req, res) { //el delete para desabilitar los datos o registros, no los borra realmente
    let id = req.params.id //en este caso va a recibir la id a eliminiar por parametro en url
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { //con esta funcion borramos el usuario fisicamente por id
    let cambiaEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true},(err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        } else {
            res.json({ //retorna lo que sea que obtenga del url
                ok: true,
                usuario: usuarioBorrado
            })
        }
    })
})


module.exports = app;