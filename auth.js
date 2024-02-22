const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy
const Person = require('./models/Person')




passport.use(new LocalStratergy(async (USERNAME,password,done) =>{
    try{
     //   console.log('Received credentials: ',USERNAME, password)
        const user = await Person.findOne({username:USERNAME})
       // console.log(user)
        if(!user){
            return done(null,false,{message:'Incorrect username'})
        }
        const isPassword = await  user.comparePassword(password)
        console.log(isPassword+' '+user.username+' '+user.password+' '+password)
        if(isPassword){
            console.log('authenticated')
            return done(null,user)
        }else{
            return done(null,false,{message:'Incorrect password'})
        }

    }catch(err){
        console.log(err)
            return done(err)
    }
}))

module.exports = passport