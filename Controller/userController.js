const express = require("express")
const {v4: uuidv4} = require("uuid")
const {setUser, getUser} = require("../Service/auth")
const User = require("../Model/userModel")
const bcrypt = require("bcrypt")

// sign up
async function handlerSignUpUser(req, res){
    try{
        if(!req.body || !req.body.name || !req.body.email || !req.body.password){
            return res.status(401).json({"msg":"Enter valid credentials"})
        }
        const existingUser = User.find({"email": req.body.email})
        if(existingUser){
            return res.status(400).json({"msg":"User already exists"})
        }
        const {nameOfUser, emailOfUser, passwordOfUser} = req.body;
        const hashedPassword = await bcrypt.hash(passwordOfUser, 10)
        const user = await User.create({name: nameOfUser,email: emailOfUser,password: hashedPassword})
        if(user){
            return res.status(200).json({"msg": "successfully signed up"})
        }
        else{
            return res.status(200).json({"msg": "failed to signed up"})
        }
        
    }
    catch(error){
        return res.status(500).json({"error": error})
    }
}

// login
async function handlerLoginUser(req, res){
    try{
        if(!req.body || !req.body.email || !req.body.password){
            return res.status(400).json({"msg": "Enter valid credentials"})
        }
        const existingUser = await User.findOne({email: req.body.email})
        if(!existingUser){
            return res.status(400).json({"msg":"email doesn't exist"})
        }
        else{
            const chechPassword = await bcrypt.compare(req.body.password, existingUser.password)
            if(chechPassword){
                return res.status(200).json({"msg":"Welcome"})
            }
            else{
                return res.status(200).json({"msg":"Password doesn't match"})
            }
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