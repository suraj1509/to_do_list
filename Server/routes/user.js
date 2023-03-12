const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SAFE = "this is safe key"

router.post('/createuser',[
    body('email','Email must be a valid email').isEmail(),
    body('password','Password must be at least 5 Character').isLength({ min: 5 }),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({email:req.body.email})
    if(user){
        return res.status(501).send({error:"Already a User exists with such email"})
    }
    let salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password.toString(), salt)
     user = await User.create({
        email:req.body.email,
        password:securePassword,
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const userToken = await jwt.sign(data,JWT_SAFE)
    res.send({userToken})
})

router.post('/login',[
    body('email','Email must be a valid email').isEmail(),
    body('password','Password must be at least 5 Character').exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {email,password}=req.body
    let user = await User.findOne({email})
    if(!user){
        return res.status(501).send({error:"Please login with correct credentials"})
    }
   let validatePassword = await bcrypt.compare(password.toString(),user.password)
   if(!validatePassword){
    return res.status(501).send({error:"Please login with correct credentials"})
}
    const data = {
        user:{
            id:user.id
        }
    }
    const userToken = await jwt.sign(data,JWT_SAFE)
    res.send({userToken})
})

module.exports = router;