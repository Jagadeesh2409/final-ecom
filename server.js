const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socket = require('socket.io')
require('dotenv').config()

const uploadRoute = require('./routes/uploadRoute')


app.use(express.json())
const io = new socket.Server(server,{
    cors:{
        origin:"*"
    }
})

app.io = io
require('./socket/index')(io)


app.use('/uploads',uploadRoute)
app.get('/',(req,res)=>{
    res.send('<h1>Server is Running</h1>')
})

server.listen(process.env.PORT,()=>{
    console.log("port is running on http://localhost:3000")
})