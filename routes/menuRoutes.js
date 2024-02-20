const express = require('express')
const router = express.Router()
const Menu = require('../models/Menu')


router.post('/',async (req,res)=>{
    try{
      const data = req.body // assuming the request body contains person data
      
      const newMenu = new Menu(data)
  
      // save new person
      const response = await newMenu.save()
      console.log('data saved');
      res.status(200).json(response) 
    }catch(err){
      console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
  })

  router.get('/',async(req,res) =>{
    try{
      const data =await Menu.find();
      console.log('data fetched');
      res.status(200).json(data) 
  
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'})
    }
  })


  router.get('/:taste',async (req,res)=>{
      try{
          const tastes = req.params.taste
          if(tastes == 'sweet'|| tastes == 'spicy'|| tastes == 'sour'){
              const response = await Menu.find({taste:tastes})
              res.status(200).json(response) 
          }else{
            res.status(404).json({error:'Taste not found'})
          }
      }catch(err){
        console.log(err);
      res.status(500).json({error:'Internal server error'})
      }
  })


  
module.exports = router