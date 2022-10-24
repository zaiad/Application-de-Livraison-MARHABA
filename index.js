const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./config/dbConfig')
// const controller = require('./controllers/userController')
const router = require('./router/route')
const port = process.env.PORT 
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
require('./middleware/generateRole')

app.use('/api/auth',router)




app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})