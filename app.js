// imports
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

// routers
const processInputRouter = require('./src/routes/processInputRouter');

// de express nos traemos lo necesario
const { json, urlencoded } = express

// creamos nuestra app
const app = express()

// definimos un puerto por el cual escucharemos peticiones
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"

// server config

app.use(json())
app.use(urlencoded({ extended: false }))
const corsOptions = { origin: '*', optionsSuccessStatus: 200 }
app.use(cors(corsOptions))

// indicamos que usaremos un router
//app.use(router)
app.use('/api',processInputRouter)

app.get('/', (req, res) =>{
    res.send('Microservice to handle IoT device Inputs');
})

// iniciamos nuestro server
app.listen(PORT,HOST, () => { console.log(`Server listening on port ${PORT} and host ${HOST}`); })