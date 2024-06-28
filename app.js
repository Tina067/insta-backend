const express = require('express')
const app = express()
const mongoose = require('mongoose')

// const {MONGOURI} = require('./keys')
require('dotenv').config()
const PORT =process.env.PORT
//febygAQryCzXjDJn

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOURI)

mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo yeahh');
})
mongoose.connection.on('error', (err)=>{
    console.log("err connecting",err);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, ()=>{
    console.log("server is running on ",PORT);
})