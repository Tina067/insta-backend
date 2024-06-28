const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

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

// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods you need
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers you need
};

// Use cors middleware with options
app.use(cors(corsOptions));

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.get('/', (req, res) => {
    res.send('Welcome to the Instagram Clone API');
});

app.listen(PORT, ()=>{
    console.log("server is running on ",PORT);
})