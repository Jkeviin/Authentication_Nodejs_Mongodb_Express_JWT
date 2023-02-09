const { Router } = require('express'); // Se importa el módulo express y se extrae el método Router para poder crear rutas de la API
const router = Router(); // Se crea una instancia de Router para poder utilizar sus métodos y propiedades

const User = require('../models/User'); // Se importa el modelo de la colección de usuarios para poder hacer consultas a la base de datos de MongoDB

// const bcrypt = require('bcrypt'); // Se importa el módulo bcrypt para poder encriptar los passwords de los usuarios 

const jwt = require('jsonwebtoken'); // Se importa el módulo jsonwebtoken para poder crear tokens de autenticación para los usuarios

router.get('/', (req, res) => { // Se crea una ruta de tipo GET para la ruta raíz de la API
    res.json({ // Se envía una respuesta en formato JSON
        message: 'Welcome to my API' // Se envía un mensaje de bienvenida
    });
});

router.post('/signup', async (req, res) => { // Se crea una ruta de tipo POST para la ruta /signup de la API
    const { email, password } = req.body; // Se extrae el email y el password del cuerpo de la petición HTTP, (req.body) que se envía desde el cliente
    const user = new User({ email, password }); // Se crea una instancia del modelo de la colección de usuarios para poder guardar el usuario en la base de datos de MongoDB
    console.log(user); // Se muestra en la consola el usuario que se va a guardar en la base de datos de MongoDB
    await user.save(); // Se guarda el usuario en la base de datos de MongoDB

    // CREACIÓN DEL TOKEN
    jwt.sign({_id: user._id }, 'secretkey', { // Se crea el token de autenticación para el usuario  (Sintaxis: jwt.sign(payload, secretOrPrivateKey, [options, callback]))
        expiresIn: 60 * 60 * 24 // Se define que el token va a expirar en 24 horas
    }, (err, token) => { // Se ejecuta una función de callback para manejar el error o la respuesta del token
        if (err) throw err; // Si hay un error se lanza una excepción
        res.json({ token }); // Si no hay error se envía el token en formato JSON
    });
});

router.post('/signin', async (req, res) => { // Se crea una ruta de tipo POST para la ruta /signin de la API
    const { email, password } = req.body; // Se extrae el email y el password del cuerpo de la petición HTTP, (req.body) que se envía desde el cliente
    const user = await User.findOne({ email }); // Se busca un usuario en la base de datos de MongoDB con el email que se envió desde el cliente
    if (!user) return res.status(401).json({ message: 'Email is not found' }); // Si no se encontró un usuario con el email que se envió desde el cliente se envía una respuesta con un código de estado 401 y un mensaje de error en formato JSON
    if (user.password !== password) return res.status(401).json({ message: 'Password is incorrect' }); // Si el password del usuario que se encontró en la base de datos de MongoDB no es igual al password que se envió desde el cliente se envía una respuesta con un código de estado 401 y un mensaje de error en formato JSON

    jwt.sign({_id: user._id }, 'secretkey', { // Se crea el token de autenticación para el usuario  (Sintaxis: jwt.sign(payload, secretOrPrivateKey, [options, callback]))
      expiresIn: 60 * 60 * 24 // Se define que el token va a expirar en 24 horas
    }, (err, token) => { // Se ejecuta una función de callback para manejar el error o la respuesta del token
        if (err) throw err; // Si hay un error se lanza una excepción
        res.json({ token }); // Si no hay error se envía el token en formato JSON
    });

});

router.get('/tasks', (req, res) => { // Se crea una ruta de tipo GET para la ruta /tasks de la API|
    res.json([ // Se envía una respuesta en formato JSON  (Se envía un arreglo de objetos JSON)
        {
            _id: 1,
            name: 'Task One',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            date: '2020-11-05T05:00:00.000Z'
        },
        {
            _id: 2,
            name: 'Task Two',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            date: '2020-11-05T05:00:00.000Z'
        },
        {
            _id: 3,
            name: 'Task Three',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            date: '2020-11-05T05:00:00.000Z'
        }
    ]);
});

router.get('/private-tasks', verifyToken, (req, res) => { // Se crea una ruta de tipo GET para la ruta /private-tasks de la API

});


module.exports = router; // Se exporta el router para poder utilizarlo en otros archivos

function verifyToken(req, res, next) { // Se crea una función para verificar el token de autenticación, los parametros que recibe son: req (petición HTTP), res (respuesta HTTP) y next (función que se ejecuta después de que se verifique el token)
    if (!req.headers.authorization) { // Si no se envía el token de autenticación en la cabecera de la petición HTTP se envía una respuesta con un código de estado 401 y un mensaje de error en formato JSON
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    const token = req.headers.authorization.split(' ')[1]; // Se extrae el token de la cabecera de la petición HTTP
    if (token === 'null') { // Si el token es null se envía una respuesta con un código de estado 401 y un mensaje de error en formato JSON
        return res.status(401).json({ message: 'Unauthorized request' });
    }

    const payload = jwt.verify(token, 'secretkey'); // Se verifica el token de autenticación (Sintaxis: jwt.verify(token, secretOrPublicKey, [options, callback]))
    console.log(payload)
    req.userId = payload._id; // Se guarda el id del usuario en la petición HTTP
    next(); // Se ejecuta la siguiente función
}
