const User = require('../models/userModel')
const Role = require('../models/roleModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Storage = require('local-storage')

const register = asyncHandler(async (req, res)=>{
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.send('input is empty')
    } else{
        const userExist = await User.findOne({email})
        if (userExist) {
            res.send('email already exist')
        } else {
            const passwordHashed = await bcrypt.hash(password, 10)

            const role = "63568f6aa30f1ee2e1395532"
            const user = await User.create({
                name,
                email,
                password: passwordHashed,
                role: role
            })

            res.json({
                name: user.name,
                email: user.email,
                role: user.role
            })
        }
    }
})

const login = asyncHandler (async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        generateToken(user._id)
        const role = await Role.findOne({_id: user.role})
        .then((role) => {
            res.send(`/api/user/${role.name}/me`)
        })
    }
    else{
        res.send('Email or password incorect')
    }
})

const generateToken = (id)=>{
    const token =  jwt.sign({id}, process.env.SECRET, {
        expiresIn: '30d'
    })
    Storage('token', token)
    return token
} 


const resetPassword = (req,res)=>{
    const {body}=req;
    if(Storage('token')){
        const token = jwt.verify(Storage('token'), process.env.SECRET)
        User.findOne({_id: token.id})
            .then(user=>{
                bcrypt.compare(body.password,user.password)
                    .then(a=>{
                        if(a){
                            if(body.newpassword == body.confirmpassword){
                                bcrypt.hash(body.newpassword,10)
                                    .then(hash=>{
                                        User.updateOne({email:user.email},{password:hash})
                                            .then(()=>{
                                                res.json({message: 'Your password is reset.'})
                                            })
                                            .catch(()=>{res.send('error')})
                                    })
                                    .catch(()=>{res.send('error')})
                            }
                            else{
                                res.send('Confirme your password')
                            }
                        }else{
                            res.send('Password incorrect')
                        }
                    })
                    .catch(()=>{res.send('error')})
            })
            .catch(()=>{res.send('error')})
    }else{
        res.json({message: 'You are not connected'})
    }
}




module.exports = {
    register,
    login,
    resetPassword
}