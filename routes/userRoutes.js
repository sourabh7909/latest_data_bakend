const express=require('express')
const bcrypt=require("bcrypt")

require("dotenv").config()
const jwt=require("jsonwebtoken")


const { UserModel } = require('../model/userModel')

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {username,avatar,email,password}=req.body
    try {
        if(username&&avatar&&email&&password){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    const user= new UserModel({username,avatar,email,password:hash})
                    await user.save()
                    res.status(200).json({msg:"user has been registerd"})
                }else{
                    res.status(200).json({msg:"incorrect password"})
                }
            })
        }else{
            res.status(200).json({msg:"input field required"})
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})




userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({ course: 'backend' }, process.env.KEY);
                    res.status(200).json({msg:"successful login",token:token})
                }else{
                    res.status(200).json({msg:"invalid Credential"})
                }
            })
        }else{
            res.status(200).json({msg:"User not found"})
        }
    } catch (error) {
        res.status(400),json({error:error.message})
    }
})
       
// userRouter.post("/appointments",async(req,res)=>{
//     try {
//         const dashbored=new DashboredModel(req.body)
//         await dashbored.save()
//         res.status(200).json({msg:"userDetails Submited",data:req.body})
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
// })


// userRouter.get("/appointments", async (req, res) => {
//     try {
//         const appointments = await DashboredModel.find(); 
        
//         res.status(200).json({ msg: "Appointments retrieved", data: appointments });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });



// userRouter.delete("/appointments/:id", async (req, res) => {
//     try {
//         const appointmentId = req.params.id;

//         const deletedAppointment = await DashboredModel.findByIdAndDelete(appointmentId);

//         if (!deletedAppointment) {
//             return res.status(404).json({ msg: "Appointment not found" });
//         }

//         res.status(200).json({ msg: "Appointment deleted", data: deletedAppointment });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

module.exports={userRouter}