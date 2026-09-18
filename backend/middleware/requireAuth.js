const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requireAuth = async (req,res,next)=>{
    const Authorization = req.headers.authorization
    if(!Authorization){
        return res.status(400).json("Please Login")
    }
    const token = await Authorization

    try{
        const {_id} = jwt.verify(token,process.env.SECRETCODE)
        req.user = await User.findOne({_id:_id}).select({_id})
        next()
    }catch(error){
        res.status(401).json("Request not Authorized")
    }
}

module.exports = requireAuth