const express = require("express")
const userModel = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userRouter.post("/register", async (req, res) => {
    const payload = req.body
    try {
        const existingUser = await userModel.findOne({ email: payload.email })
        if (existingUser) {
            res.send({msg : "user already exists"})
        } else {
            bcrypt.hash(payload.pass, 3, async function (err, hash) {
                if (err) {
                    res.status(400).send({err});
                } else {
                    const user = new userModel({ ...payload, pass: hash })
                    await user.save();
                    res.status(200).send({ "data added ": user })
                }
            });
        }
    } catch (err) {
        console.log({err});
        res.status(400).send({err})
    }
})


//token expiration
userRouter.post("/login", async (req, res) => {
    const { pass, email } = req.body
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            bcrypt.compare(pass, existingUser.pass, function (err, result) {
                if (result) {
                    const token = jwt.sign({userId: existingUser._id,author:existingUser.name}, 'masai',{expiresIn:"1h"});
                    res.status(200).send({msg:"login successsful" ,token })
                } else {
                    res.status(200).send({msg:"Invalid Credentials!!"})
                }
            });
        } else {
            res.status(200).send({msg : "Email id doesn't exist"})
        }
    } catch (err) {
        console.log({err});
        res.status(400).send({err})
    }
})

module.exports = userRouter