const mongoose = require('mongoose')
require('dotenv').config()
// define the mongodb connection url

//const mongoURL = process.env.DB_LOCAL_URL// local 
const mongoURL = process.env.DB_URL

// setup mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// get the default connection
// mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection


// event listener
db.on('connected',()=>{
    console.log('connected to mongodb')
})

db.on('error',(err)=>{
    console.log('mongo db connection error : ',err)
})
db.on('disconnected',()=>{
    console.log('mongo db disconnected')
})


module.exports = db