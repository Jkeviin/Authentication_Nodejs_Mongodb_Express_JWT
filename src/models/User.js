const { Schema, model } = require('mongoose');  // Se importa el módulo mongoose y se extrae el Schema y el método model

const userSchema= new Schema({  // Se crea el esquema de la colección de usuarios
    email: String, // Se define el campo email como un String
    password: String  // Se define el campo password como un String
}, {
    timestamps: true  // Se define que se van a guardar las fechas de creación y actualización de los documentos
});

module.exports = model('User', userSchema);  // Se exporta el modelo de la colección de usuarios para poder utilizarlo en otros archivos
