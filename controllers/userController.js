const User = require('../model/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

//Login user
const loginUser = async (req,res) => {
    const  {email,password} = req.body

    try {
        const user =  await User.login(email,password)
        //Create Token
        const token = createToken(user._id)
        res.status(200).json({email,token, success: true})
    }catch(error) {
        res.status(400).json({error:error.message})
    }
    
}

//signup user
const signupUser = async (req,res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.signup(name, email, password)
        //create Token
        const token = createToken(user._id)
        res.status(200).json({email,token, success:true})
    }catch (error) {
        res.status(400).json({error:error.message})
    }

    
}

module.exports = { signupUser , loginUser }