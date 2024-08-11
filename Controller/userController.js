const express = require("express")
const User = require("../Model/userModel")

async function handlerSignUpUser(req, res){
    try{
        if(!req.body || !req.body.name || !req.body.email || !req.body.password){
            return res.status(401).json({"msg":"Enter valid credentials"})
        }
        const {nameOfUser, emailOfUser, passwordOfUser} = req.body;
        await User.create({name: nameOfUser,email: emailOfUser,password: passwordOfUser})
        return res.status(200).json({"msg": "successfully signed up"})
    }
    catch(error){
        return res.status(500).json({"error": error})
    }
}

async function handlerLoginUser(req, res){
    try{
        if(!req.body || !req.body.email || !req.body.password){
            return res.status(400).json({"msg": "Enter valid credentials"})
        }
        const {email, password} = req.body
        const user = await User.findOne({email, password})
        if(!user){
            console.log("user not available", user)
            return res.status(400).json({"msg": "Enter valid email and password"})
        }
        else{
            console.log("user is available", user)
            return res.status(200).json({"msg": "Welcome"})
        }
    }
    catch(error){
        return res.status(500).json({"error": error})
    }
}

module.exports = {
    handlerSignUpUser,
    handlerLoginUser
}