const path = require('path')
const { pullIntent } = require('./getIntent')
const getJourneyFlow = require('./utils/journeys');
const sendMessage = require('./utils/sendMessage');
const client = require('./utils/context.js');
const App = require('./botHelper')
const asyncForEach = require('./utils/asyncForEach')
const validatorsPath = path.join(__dirname, "/validators")
const promptPath = path.join(__dirname, "/prompts")
const { sendTextMessage } = require("./utils/messageObject")

// TODO: 
// Refactor and reuse code

const botResponse = (userMessage, sender) => {
    return new Promise(async resolve => {
        const app = new App(sender, userMessage)
        const prediction = await app.predict(userMessage)
        if (prediction.confidence > app.minConfidence) {
            try {
                // Fetch journey flow from the DB
                try {
                    let context = await getJourneyFlow(prediction.intent)
                    let currentStep = 0
                    // client.setex(sender, 3600, JSON.stringify({ 'journey': prediction.intent, context, currentStep }));
                    const newJourney = true
                    await app.setContext(sender, { 'journey': prediction.intent, context, currentStep }, newJourney)
                    //Multiple prompts
                    let prompts = context[currentStep]["prompt"]
                    let messageArray = []
                    await asyncForEach(prompts, async (prompt, index) => {
                        const toSendMessage = await sendMessage(prompt, sender)
                        // console.log("To send Message variable",JSON.stringify(toSendMessage))
                        messageArray.push(...toSendMessage)
                    });
                    resolve(messageArray)
                }
                catch (e) {
                    console.log("Error in inner catch block", e)
                    resolve([sendTextMessage("I am still learning and could answer that as of now")])
                }
            }
            // Sending small talk response to the user
            catch (e) {
                console.log("Error in outer catch block", e)
                resolve([sendTextMessage("I am facing a technical issue. Please try later")])
            }
        }
        else {
            client.get(sender, async (err, result) => {
                if (result) {
                    result = JSON.parse(result)
                    console.log("contect from redis", result)
                    let { currentStep, journey, context } = result
                    // Check if response is should be sent
                    if (currentStep == context.length - 2) {
                        if (context[currentStep]["validator"] != null) {
                            const validator = require(validatorsPath + '/' + context[currentStep]["validator"])
                            const validatorResponse = await validator(userMessage)
                            if (validatorResponse.success) {
                                // client.del(sender)
                                let response = context[context.length - 1]["response"]
                                let messageArray = []
                                await asyncForEach(response, async (responseObject, index) => {
                                    console.log("Response Object=============================================>", responseObject)
                                    if (responseObject.type == 'intent') {
                                        let context = await getJourneyFlow(responseObject.value)
                                        console.log("Context variable in trigger intent", context)
                                        let currentStep = 0
                                        // client.setex(sender, 3600, JSON.stringify({ 'journey': responseObject.value, context, currentStep }));
                                        const newJourney = true
                                        await app.setContext(sender, { 'journey': responseObject.value, context, currentStep }, newJourney)
                                        //Multiple prompts
                                        if (context.length > 1) {
                                            let prompts = context[currentStep]["prompt"]
                                            await asyncForEach(prompts, async (prompt, index) => {
                                                const toSendMessage = await sendMessage(prompt, sender)
                                                // console.log("To send Message variable",JSON.stringify(toSendMessage))
                                                messageArray.push(...toSendMessage)
                                            });
                                        }
                                        else {
                                            let responses = context[currentStep]["response"]
                                            await asyncForEach(responses, async (response, index) => {
                                                const toSendMessage = await sendMessage(response, sender)
                                                // console.log("To send Message variable",JSON.stringify(toSendMessage))
                                                messageArray.push(...toSendMessage)
                                            });
                                        }
                                    }
                                    else {
                                        const toSendMessage = await sendMessage(responseObject, sender)
                                        messageArray.push(...toSendMessage)
                                    }
                                })
                                resolve(messageArray)
                            }
                            else {
                                resolve([sendTextMessage(validatorResponse.message)])
                            }
                        }
                        else {
                            // client.del(sender)
                            let message = context[context.length - 1]['response'][0].value
                            resolve([sendTextMessage(message)])
                        }
                    }

                    // Executing step validators
                    else {
                        if (context[currentStep]["validator"] != null) {
                            const validator = require(validatorsPath + '/' + context[currentStep]["validator"])
                            const validatorResponse = await validator(userMessage)
                            if (validatorResponse.success) {
                                context[currentStep]["stepValue"] = validatorResponse.message
                                currentStep += 1
                                // client.setex(sender, 3600, JSON.stringify({ journey, context, currentStep }))
                                await app.setContext(sender, { journey, context, currentStep })
                                //Multiple prompts
                                let prompts = context[currentStep]["prompt"]
                                let messageArray = []
                                await asyncForEach(prompts, async (prompt, index) => {
                                    const toSendMessage = await sendMessage(prompt, sender)
                                    // console.log("To send Message variable",JSON.stringify(toSendMessage))
                                    messageArray.push(...toSendMessage)
                                });
                                resolve(messageArray)
                            }
                            else {
                                resolve([sendTextMessage(validatorResponse.message)])
                            }
                        }
                        else {
                            context[currentStep]["stepValue"] = userMessage
                            currentStep += 1
                            // client.setex(sender, 3600, JSON.stringify({ journey, context, currentStep }))
                            await app.setContext(sender, { journey, context, currentStep })
                            //Multiple prompts
                            let prompts = context[currentStep]["prompt"]
                            let messageArray = []

                            await asyncForEach(prompts, async (prompt, index) => {
                                const toSendMessage = await sendMessage(prompt, sender)
                                // console.log("To send Message variable",JSON.stringify(toSendMessage))
                                messageArray.push(...toSendMessage)
                            });
                            resolve(messageArray)
                        }
                    }
                }

                // Context not found - Executing model to get response
                else {
                    try {
                        // Get intent/small talk response from ML Model
                        const data = await pullIntent(userMessage)

                        // Check if intent object is present
                        try {
                            let journeyDetails = JSON.parse(data)
                            let context = journeys[journeyDetails.journey]
                            let currentStep = 0
                            // client.setex(sender, 3600, JSON.stringify({ 'journey': journeyDetails.journey, context, currentStep }));
                            await app.setContext(sender, { "journey": journeyDetails.journey, context, currentStep })
                            //Multiple prompts
                            let prompts = context[currentStep]["prompt"]
                            let messageArray = []
                            await asyncForEach(prompts, async (prompt, index) => {
                                const toSendMessage = await sendMessage(prompt, sender)
                                // console.log("To send Message variable",JSON.stringify(toSendMessage))
                                messageArray.push(...toSendMessage)
                            });
                            resolve(messageArray)
                        }
                        catch (e) {
                            resolve([sendTextMessage(data.toString())])
                        }
                    }

                    // Sending small talk response to the user
                    catch (e) {
                        console.log("error while fetching data from python file", e)
                        resolve([sendTextMessage("I am facing a technical issue. Please try later")])
                    }
                }
            })
        }
    })
}

module.exports = botResponse