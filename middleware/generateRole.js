const mongoose = require('mongoose')
const { count } = require('../models/userModel')
mongoose.Promise = global.Promise

const db = {}

db.role = require('../models/roleModel')

db.role.estimatedDocumentCount((err, count)=>{
    if (!err && count == 0) {
        new db.role({
            name: "manager"
        }).save(err=>{
            if (err) {
                console.log('error',err)
            }
            console.log('added manager to role collection')
        }),
        new db.role({
            name: "client"
        }).save(err=>{
            if (err) {
                console.log('error',err)
            }
            console.log('added client to role collection')
        }),
        new db.role({
            name: "livreur"
        }).save(err=>{
            if (err) {
                console.log('error',err)
            }
            console.log('added livreur to role collection')
        })
    }
})