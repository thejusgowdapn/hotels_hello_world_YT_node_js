const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // req.body

const Person = require('./models/Person')
const Menu = require('./models/Menu')







const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes)

app.listen(3000,()=>{
    console.log('server is listining on 3000')
})
