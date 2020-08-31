//process es un objeto global que siempre esta corriendo en toda la app node y se actualiza dependiendo del enviroment donde esta corriendo


//PUERTO
process.env.PORT = process.env.PORT || 3000

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //para saber si estoy en desarrollo o en produccion

//BASE DE DATOS
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/bbdd-cristian';
}else{
    urlDB = process.env.MONGO_URI;//le pasamos la url de la conexion a mongo db atlas por EV. mongodb+srv://cs7:7sOVrOL0nejZ7qPO@cluster0.jhc8w.mongodb.net/bbdd-cristian
}                                             

process.env.urlDB = urlDB;