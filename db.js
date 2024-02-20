const mongoose = require('mongoose')

// define the mongodb connection url

const mongoURL = 'mongodb://localhost:27017/student'

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