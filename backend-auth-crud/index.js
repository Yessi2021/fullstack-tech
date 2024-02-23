const express = require('express')
require('dotenv').config()
const { connectDB } = require('./database')
const cors = require('cors')

// SERVIDOR EXPRESS
const app = express()


connectDB()

// CORS
app.use(cors())

app.use( express.static('public'));


app.use(express.json());


// RUTAS
// TODO: autenticacion// crear usuarios, login//renovacion token
// CRUD: eventos

// LOGIN
app.use('/api/auth', require('./routes/auth'));

// EVENTOS DEL CRUD
app.use('/api/links', require('./routes/events'));




app.listen(process.env.PORT, ()=> {
    console.log(`SERVER RUNNING ON ${ process.env.PORT }`)
})

// yessi1234567
