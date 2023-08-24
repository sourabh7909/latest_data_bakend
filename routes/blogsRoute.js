const express=require('express')
// const bcrypt=require("bcrypt")

require("dotenv").config()
// const jwt=require("jsonwebtoken")


// const { UserModel } = require('../model/userModel')
const { BlogModel } = require('../model/blogmodel')
const { Auth } = require('../Authmiddleware')

const blogRouter=express.Router()


blogRouter.post("/create",Auth,async(req,res)=>{
    try {
        const blog=new BlogModel(req.body)
        await blog.save()
        res.status(200).json({msg:"userDetails Submited",data:req.body})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
module.exports={blogRouter}
  