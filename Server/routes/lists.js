const express = require('express');
const router = express.Router();
const Lists = require('../models/List');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

//==================================================================================================
router.get('/fetchalllists',fetchuser,async(req,res)=>{
    let list = await Lists.find({user:req.user.id}).sort({date:-1})
    res.send(list)
})

//==================================================================================================
router.post('/addlist',fetchuser,[
    body('title','Title must be a valid title').isLength({ min: 3 }),
    body('description','Description must be at least 5 Character').isLength({ min: 5 }),
],async(req,res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {title,description}=req.body;

    let list = await new Lists({
        title,description,user:req.user.id
    })
    list.save()
    res.send(list) } catch (error) {
        console.log(error)
    }
})

//==================================================================================================
router.put('/editlist/:id',fetchuser,async(req,res)=>{
   
    let {title,description}=req.body;

    let newList = {};
    if(title){newList.title = title}
    if(description){newList.description = description}

    let list = await Lists.findById(req.params.id);
    if(!list){
        return  res.status(501).send({error:"list not found"})
    }
    if(list.user.toString() !== req.user.id){
        return res.status(501).send({error:"user list not found"})
    }
    
    newList = await Lists.findByIdAndUpdate(req.params.id ,{$set:newList}, {new:true})

    res.send(newList)
})

//==================================================================================================
router.delete('/deletelist/:id',fetchuser,async(req,res)=>{
    let list = await Lists.findById(req.params.id);
    if(!list){
        return  res.status(501).send({error:"list not found"})
    }
    if(list.user.toString() !== req.user.id){
        return res.status(501).send({error:"user list not found"})
    }
    
    newList = await Lists.findByIdAndDelete(req.params.id)

    res.send(newList)
})


module.exports = router;