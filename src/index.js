const express = require('express');  // Se importa el módulo express
const app = express(); // Lo que se hace es crear una instancia de Express para poder utilizar sus métodos y propiedades

require('./database');  // Se importa el archivo database.js para poder conectarse a la base de datos

app.use(express.json());  // Se le indica a Express que se va a utilizar JSON para poder enviar y recibir datos desde el cliente, sin esto no se podrían enviar datos desde el clientes

app.use('/api', require('./routes/index'));  // Se importa el archivo index.js de la carpeta routes y se le asigna la ruta /api

app.listen(3000, () => { // Se crea un servidor web en el puerto 3000 para poder hacer peticiones a la API
    console.log('Server on port 3000'); // Se muestra un mensaje en la consola para indicar que el servidor está corriendo
      // Para hacer una prueba de que el servidor está corriendo, node src/index.js
});





// Path: src\index.js