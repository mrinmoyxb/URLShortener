const express = require("express")
const User = require("../Model/userModel")

async function handlerSignUpUser(req, res){
    const body = req.body
    if(!body || !body.name || !body.email || !body.password){
        return res.status(401).json({"msg":"Enter valid details"})
    }
    const {name, email, password} = req.body;
    await User.create({name: name,email: email,password: password})
    return res.status(200).json({"msg": "successfully signed up"})
}

module.exports = {
    handlerSignUpUser
}