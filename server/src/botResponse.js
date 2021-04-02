const path = require('path')
const { pullIntent } = require('./getIntent')
const journeys = require('./utils/journeys');

const sendMessage = require('./utils/sendMessage');
const client = require('./utils/context.js');
// const { resolve } = require('path');
// const { response } = require('express');

// const publicDirectoryPath = path.join(__dirname, "../public")
const validatorsPath = path.join(__dirname, "/validators")
const promptPath = path.join(__dirname, "/prompts")

const botResponse = (userMessage, sender) => {
    return new Promise(resolve => {
        client.get(sender, async (err, result) => {
            if (result) {
                result = JSON.parse(result)
                console.log("Context found", result)
                let { currentStep, journey, context } = result

                // Check if response is should be sent
                if (currentStep == context.length - 2) {
                    if (context[currentStep]["validator"] != null) {
                        const validator = require(validatorsPath + '/' + context[currentStep]["validator"])
                        const validatorResponse = await validator(userMessage)
                        if (validatorResponse.success) {
                            client.del(sender)
                            let response = context[context.length - 1]["response"]
                            response.forEach(async responseObject => {
                                if (responseObject.type == 'text') {
                                    const toSendMessage = await sendMessage(responseObject, sender)
                                    resolve(toSendMessage)
                                    // socket.emit("message", toSendMessage)
                                    // socket.emit("message", responseObject["value"])
                                }
                                else {
                                    let context = journeys[responseObject.value]
                                    let currentStep = 0
                                    client.setex(sender, 3600, JSON.stringify({ 'journey': responseObject.value, context, currentStep }));
                                    console.log("Showing first step")
                                    //Multiple prompts
                                    let prompts = context[currentStep]["prompt"]
                                    let messageArray = []
                                    prompts.forEach(async prompt => {
                                        const toSendMessage = await sendMessage(prompt, sender)
                                        messageArray.push(...toSendMessage)
                                        // resolve(toSendMessage)
                                        // socket.emit("message", toSendMessage)
                                        // socket.emit("message", prompt["value"])
                                    });
                                    resolve(messageArray)
                                }
                            })
                        }
                        else {
                            resolve(validatorResponse.message)
                            // socket.emit("message", validatorResponse.message)
                        }
                    }
                    else {
                        console.log("No validator found")
                        client.del(sender)
                        resolve(context[context.length - 1]['response'][0].value)
                        // socket.emit("message", context[context.length - 1]["response"][0]["value"])
                    }
                }

                // Executing step validators
                else {
                    // const prompt = require(promptPath+'/mobilePrompt.js')
                    // const promptContext = await prompt(sender)
                    // console.log(promptContext,'context prompt')
                    if (context[currentStep]["validator"] != null) {
                        const validator = require(validatorsPath + '/' + context[currentStep]["validator"])
                        const validatorResponse = await validator(userMessage)
                        console.log("Validator Response:", validatorResponse.message)
                        if (validatorResponse.success) {
                            context[currentStep]["stepValue"] = validatorResponse.message
                            currentStep += 1
                            client.setex(sender, 3600, JSON.stringify({ journey, context, currentStep }))
                            //Multiple prompts
                            let prompts = context[currentStep]["prompt"]
                            let messageArray = []
                            prompts.forEach(async prompt => {
                                const toSendMessage = await sendMessage(prompt, sender)
                                messageArray.push(...toSendMessage)
                                // resolve(toSendMessage)
                                // socket.emit("message", toSendMessage)
                                // socket.emit("message", prompt["value"])
                            });
                            resolve(messageArray)
                        }
                        else {
                            resolve(validatorResponse.message)
                            // socket.emit("message", validatorResponse.message)
                        }
                    }
                    else {
                        console.log("No validator found")
                        context[currentStep]["stepValue"] = userMessage
                        currentStep += 1
                        client.setex(sender, 3600, JSON.stringify({ journey, context, currentStep }))
                        //Multiple prompts
                        let prompts = context[currentStep]["prompt"]
                        let messageArray = []
                        prompts.forEach(async prompt => {
                            const toSendMessage = await sendMessage(prompt, sender)
                            console.log('send message from for each', toSendMessage)
                            messageArray.push(...toSendMessage)
                            // resolve(toSendMessage)
                            // socket.emit("message", toSendMessage)

                            // socket.emit("message", prompt["value"])
                        });
                        resolve(messageArray)
                    }
                }
            }

            // Context not found - Executing model to get response
            else {
                console.log(userMessage)
                console.log("sender id", sender)
                try {
                    // Get intent/small talk response from ML Model
                    const data = await pullIntent(userMessage)

                    // Check if intent object is present
                    try {
                        let journeyDetails = JSON.parse(data)
                        let context = journeys[journeyDetails.journey]
                        let currentStep = 0
                        client.setex(sender, 3600, JSON.stringify({ 'journey': journeyDetails.journey, context, currentStep }));
                        console.log("Showing first step")
                        //Multiple prompts
                        let prompts = context[currentStep]["prompt"]
                        let messageArray = []
                        prompts.forEach(async prompt => {
                            const toSendMessage = await sendMessage(prompt, sender)
                            console.log('send message from for loop', toSendMessage)
                            // resolve(toSendMessage)
                            messageArray.push(...toSendMessage)

                            // socket.emit("message", toSendMessage)
                            // socket.emit("message", prompt["value"])
                        });
                        resolve(messageArray)
                    }
                    catch (e) {
                        resolve(data.toString())

                        // socket.emit('message', data.toString())
                    }
                }

                // Sending small talk response to the user
                catch (e) {
                    console.log("error while fetching data from python file")
                    resolve("I am facing a technical issue. Please try later")
                    // socket.emit('message', "I am facing a technical issue. Please try later")
                }
            }
        })
    })
}


module.exports = botResponse