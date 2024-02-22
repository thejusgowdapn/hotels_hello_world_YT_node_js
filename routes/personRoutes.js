const express = require('express')
const router = express.Router()

const Person = require("../models/Person")


router.post('/signup', async (req,res)=>{
    try{
      const data = req.body // assuming the request body contains person data
      
      const newPerson = new Person(data)
  
      // save new person
      const response = await newPerson.save()
      console.log('data saved');
      res.status(200).json(response) 
  
    }catch(err){
         
          console.log(err);
         
          res.status(500).json({error:'Internal server error'})
    }
    
  })



  router.get('/:workType',async (req,res)=>{
    try{
      const workType = req.params.workType
      if(workType== 'chef' || workType=='manager' || workType=='waiter'){
          const response = await Person.find({work: workType})
          console.log('data fetched')
          res.status(200).json(response)
      }else{
        res.status(404).json({error:'Invalid role'})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})
    }
  })



// get person details
router.get('/',async (req,res) =>{
    try{
        const data =await Person.find();
        console.log('data fetched');
        res.status(200).json(data) 
    
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'}) 
    }
})

router.get('/byid/:id', async (req,res)=>{
    try{
        const data = await Person.fingById(req.params)
        res.json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'}) 
    }
})

// update 
router.put('/:id', async (req, res)=>{
    
    try{
      const ids = req.params.id
      const updatedPerson = req.body;
     
      
      const response = await Person.findByIdAndUpdate(ids, updatedPerson,{
        new : true, //return the updated document
        runValidators :  true, // run  mongoose validators
      })
      
      if(!response){
        
        return res.status(404).json({error:'Not found'})
      }
      
      res.status(200).json(response)

    }catch(err){
      console.log(err);
    res.status(500).json({error:'Internal server error'})
    }
})


// delete 
router.delete('/:id',async (req,res)=>{
    try{
        const response = await Person.findByIdAndDelete(req.params.id)
        console.log(response)
        if(!response){
            return res.status(404).json({error:'Not found'})
        }
        return res.status(200).json({error:'Deleted '})
    }
    catch(err){
        console.log(err);
    res.status(500).json({error:'Internal server error'})
    }
})


module.exports =router
