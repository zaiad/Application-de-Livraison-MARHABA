const mongoose = require('mongoose')
const dotenv=require('dotenv').config()
// connect Database

module.exports =  mongoose.connect(process.env.CONNECT_DB)
.then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log('your not connected')
})