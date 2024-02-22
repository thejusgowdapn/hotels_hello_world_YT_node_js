const express = require('express')
const app = express()
const db = require('./db')
const passport = require('./auth')


const LocalStratergy = require('passport-local').Strategy


const bodyParser = require('body-parser')
app.use(bodyParser.json()) // req.body

const Person = require('./models/Person')
const Menu = require('./models/Menu')



// Middle ware function
const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next()
}

app.use(logRequest)



app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local',{session:false})

app.get('/',localAuthMiddleware ,function(req, res){
    console.log('welcome to hotel')
    res.status(200).json({message:'Welcome to hotel'})
})

const personRoutes = require('./routes/personRoutes')
app.use('/person',localAuthMiddleware,personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu',menuRoutes)


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log('server is listining on 3000')
})

