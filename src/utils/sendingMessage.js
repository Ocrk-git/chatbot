// const express = require('express')
// const http = require('http')

// const socketio = require('socket.io')


// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)
// var userMsg
// const sendmessage = (message) => {
//     userMsg = message
// }

const sendTextMessage = (message) =>{
    return message
    // console.log('message from sendtext',message)
    // io.on('connection',(socket)=>{
        // socket.emit('message',userMsg)
        // return 
    // })
}



module.exports = { sendTextMessage }