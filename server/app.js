const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const redis = require('redis');
const { pullIntent } = require('./src/getIntent')
const journeys = require('./src/utils/journeys');
const { send } = require('process');
// const botResponse = require("botResponse")
// const { generateYoutubeVideos } = require('./youtubeSeach')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
// const { app, server, io, sendTextMessage} = require('./utils/sendingMessage')

const sendMessage = require('./src/utils/sendMessage');


const publicDirectoryPath = path.join(__dirname, "./public/")
const validatorsPath = path.join(__dirname, "/validators")
const promptPath = path.join(__dirname, "/prompts")
const port = process.env.PORT || 5000

app.use(express.static(publicDirectoryPath))

const client = require('./src/utils/context.js');
const { dirname } = require('path');
const botResponse = require('./src/botResponse');

// Print redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err);
});

io.on('connection', (socket) => {
    // const dummy = require('../')
    // console.log(socket)
    // const { sendTextMessage } = require('./utils/sendingMessage')
    // sendTextMessage(socket)
    const sender = socket.id
    console.log("new web socket connection", sender)
    const welcomeMessage = {
        title: "Hello! I am Edith, your virtual assistant for Entiretyin. How can I help you?",
        options: [
            {
                title: "Raise Ticket"
            },
            {
                title: "View Ticket Status"
            },
            {
                title: "Frequently Asked Questions"
            }
        ]
    }
    socket.emit('welcome', welcomeMessage)

    socket.on('sendMessage', async (userMessage, callback) => {
        console.log("User message ---->",userMessage)
        const botMessage = await botResponse(userMessage,sender)
        console.log(botMessage,'bot Message')
        socket.emit('botMessage',botMessage)
        // client.get(sender, async (err, result) => {
        //     if (result) {
        //         result = JSON.parse(result)
        //         console.log("Context found", result)
        //         let { currentStep, journey, context } = result

        //         // Check if response is should be sent
        //         if (currentStep == context.length - 2) {
        //             if (context[currentStep]["validator"] != null) {
        //                 const validator = require(validatorsPath + '/' + context[currentStep]["validator"])
        //                 const validatorResponse = await validator(userMessage)
        //                 if (validatorResponse.success) {
        //                     client.del(sender)
        //                     let response = context[context.length - 1]["response"]
        //                     response.forEach(async responseObject => {
        //                         if (responseObject.type == 'text') {
        //                             const toSendMessage = await sendMessage(responseObject, sender)
        //                             socket.emit("message", toSendMessage)
        //                             // socket.emit("message", responseObject["value"])
        //                         }
        //                         else {
        //                             let context = journeys[responseObject.value]
        //                             let currentStep = 0
        //                             client.setex(sender, 3600, JSON.stringify({ 'journey': responseObject.value, context, currentStep }));
        //                             console.log("Showing first step")
        //                             //Multiple prompts
        //                             let prompts = context[currentStep]["prompt"]
        //                             prompts.forEach(async prompt => {
        //                                 const toSendMessage = await sendMessage(prompt, sender)
        //                                 socket.emit("message", toSendMessage)
        //                                 // socket.emit("message", prompt["value"])
        //                             });
        //                         }
        //                     })
        //                 }
        //                 else {
        //                     socket.emit("message", validatorResponse.message)
        //                 }
        //             }
        //             else {
        //                 console.log("No validator found")
        //                 client.del(sender)
        //                 socket.emit("message", context[context.length - 1]["response"][0]["value"])
        //             }
        //         }

        //         // Executing step validators
        //         else {
        //             // const prompt = require(promptPath+'/mobilePrompt.js')
        //             // const promptContext = await prompt(sender)
        //             // console.log(promptContext,'context prompt')
        //             if (context[currentStep]["validator"] != null) {
        //                 const validator = require(validatorsPath + '/' + context[currentStep]["validator"])
        //                 const validatorResponse = await validator(userMessage)
        //                 console.log("Validator Response:", validatorResponse.message)
        //                 if (validatorResponse.success) {
        //                     context[currentStep]["stepValue"] = validatorResponse.message
        //                     currentStep += 1
        //                     client.setex(sender, 3600, JSON.stringify({ journey, context, currentStep }))
        //                     //Multiple prompts
        //                     let prompts = context[currentStep]["prompt"]
        //                     prompts.forEach(async prompt => {
        //                         const toSendMessage = await sendMessage(prompt, sender)
        //                         socket.emit("message", toSendMessage)
        //                         // socket.emit("message", prompt["value"])
        //                     });
        //                 }
        //                 else {
        //                     socket.emit("message", validatorResponse.message)
        //                 }
        //             }
        //             else {
        //                 console.log("No validator found")
        //                 context[currentStep]["stepValue"] = userMessage
        //                 currentStep += 1
        //                 client.setex(sender, 3600, JSON.stringify({ journey, context, currentStep }))
        //                 //Multiple prompts
        //                 let prompts = context[currentStep]["prompt"]
        //                 prompts.forEach(async prompt => {
        //                     const toSendMessage = await sendMessage(prompt, sender)
        //                     console.log('send message from for each', toSendMessage)
        //                     socket.emit("message", toSendMessage)

        //                     // socket.emit("message", prompt["value"])
        //                 });
        //             }
        //         }
        //     }

        //     // Context not found - Executing model to get response
        //     else {
        //         console.log(userMessage)
        //         console.log("sender id", sender)
        //         try {
        //             // Get intent/small talk response from ML Model
        //             const data = await pullIntent(userMessage)

        //             // Check if intent object is present
        //             try {
        //                 let journeyDetails = JSON.parse(data)
        //                 let context = journeys[journeyDetails.journey]
        //                 let currentStep = 0
        //                 client.setex(sender, 3600, JSON.stringify({ 'journey': journeyDetails.journey, context, currentStep }));
        //                 console.log("Showing first step")
        //                 //Multiple prompts
        //                 let prompts = context[currentStep]["prompt"]
        //                 prompts.forEach(async prompt => {
        //                     const toSendMessage = await sendMessage(prompt, sender)
        //                     console.log('send message from for loop', toSendMessage)
        //                     socket.emit("message", toSendMessage)
        //                     // socket.emit("message", prompt["value"])
        //                 });
        //             }
        //             catch (e) {
        //                 socket.emit('message', data.toString())
        //             }
        //         }

        //         // Sending small talk response to the user
        //         catch (e) {
        //             console.log("error while fetching data from python file")
        //             socket.emit('message', "I am facing a technical issue. Please try later")
        //         }
        //     }
        // })
    })

    // Deleting sender's context on disconnect
    socket.on('disconnect', () => {
        try {
            client.del(sender)
            console.log(`Deleting context for sender ${sender}`)
        }
        catch (e) {
            console.log("Error", e)
        }
    })
})


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})