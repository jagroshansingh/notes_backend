const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    name:'String',
    email:'String',
    password:'String'
})

const AuthModel=mongoose.model('authentication',authSchema)

module.exports={AuthModel}