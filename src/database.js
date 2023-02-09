const mongoose = require('mongoose');  // Se importa el módulo mongoose

mongoose.set("strictQuery", false);  // Se desactiva el modo estricto de las consultas de Mongoose

mongoose.connect('mongodb://127.0.0.1:27017/angular-auth', {  // Se crea la conexión a la base de datos de MongoDB con el nombre de la base de datos "angular-auth"
    // Parametros de conexión
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))  // Se muestra un mensaje en la consola para indicar que la base de datos está conectada
    .catch(err => console.error(err));  // Se muestra un mensaje en la consola para indicar que hubo un error al conectar la base de datos
