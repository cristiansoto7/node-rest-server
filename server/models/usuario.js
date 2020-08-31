const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}


let Schema = mongoose.Schema //aca creamos uns shcema para..
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario'] //decimos que el parametro es requerido
    },
    email: {
        type: String,
        unique: true, // decimos que es unico, osea no se puede repetir, se usa en conujnto con el paquete mongoose-unique-validator
        required: [true, 'el correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE', //lo asigna por default si es q no hay otro
        enum: rolesValidos //toma como validos los especificados en rolesValidos y devuelve un mensaje de error si es q no lo es
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password //aca eliminamos la contraseña del objeto usuario

    return userObject
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' }) //metodo del mongoose-unique-validator para retornar mensaje
module.exports = mongoose.model('Usuario', usuarioSchema)