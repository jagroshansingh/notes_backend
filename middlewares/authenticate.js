const express=require('express')
const jwt=require('jsonwebtoken')

const authenticate=async(req,res,next)=>{
    let token=req.headers.token
    try {
        await jwt.verify(token, 'masai', function(err, decoded) {
            if(decoded)
            {
                req.body.author=decoded.author
                next()
            }
            else res.send({msg:"Invalid credentials"})
        });
    } catch (error) {
        res.send(error)
    }
    
}
module.exports={authenticate}