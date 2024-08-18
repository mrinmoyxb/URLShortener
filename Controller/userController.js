const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../Model/userModel")
const bcrypt = require("bcrypt")
require('dotenv').config()

// sign up
async function handlerSignUpUser(req, res){
    console.log("done")
    try{
        if(!req.body || !req.body.name || !req.body.email || !req.body.password){
            return res.status(401).json({"msg":"Enter valid credentials"})
        }
        const existingUser = await User.findOne({email: req.body.email})
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = await User.create({name: req.body.name, email: req.body.email, password: hashedPassword})
            return res.status(200).json({"msg": "successfully signed up"})
        }
        else{
            return res.status(400).json({"msg":"User already exists"})
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

        if(existingUser){
            const checkPassword = await bcrypt.compare(req.body.password, existingUser.password)
            if(checkPassword){
                const accessToken = jwt.sign({name: req.body.name, id: existingUser._id}, process.env.ACCESS_TOKEN, {expiresIn: '120s'})
                const refreshToken = jwt.sign({name: req.body.name, id: existingUser._id}, process.env.REFRESH_TOKEN, {expiresIn: '30s'})
                const updateUser = await User.findOneAndUpdate({_id: existingUser._id}, {$set: {refreshToken: refreshToken}})
                res.cookie('jwt_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000}) // http cookies are not available to JS
                console.log("refresh token", refreshToken)
                console.log("Update user: ", updateUser)
                return res.status(200).json({"msg":"Welcome"})
            }
            else{
                return res.status(200).json({"msg":"Password doesn't match"})
            }
        }
        else{
            return res.status(400).json({"msg":"user doesn't exist"})
        }
    }
    catch(error){
        return res.status(500).json({"error": error})
    }
}

// GET
async function getAllUsers(req, res){
    try{
        const users = await User.find()
        return res.status(200).json({"msg":users})
    }catch(error){
        return res.status(500).json({"error": error})
    }
}

module.exports = {
    handlerSignUpUser,
    handlerLoginUser,
    getAllUsers
}