// const context = require('./context')
const path = require('path')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo,
    sendRating
} = require('./messageObject')
const promptsPath = path.join(__dirname, '../prompts')
const sendMessage = (prompt, senderId, app) => {
    return new Promise(async resolve => {
        if (prompt.type == "text") {
            resolve([sendTextMessage(prompt.value)])
        }
        else if (prompt.type == "quickReply") {
            resolve([sendQuickReply(prompt.value)])
        }
        else if (prompt.type == "cards") {
            resolve([sendCards(prompt.value)])
        }
        else if (prompt.type == "image") {
            console.log('Image prompt', prompt)
            resolve([sendImage(prompt.url)])
        }
        else if (prompt.type == "video") {
            resolve([sendVideo(prompt.url)])
        }
        else if (prompt.type == "rating") {
            resolve([sendRating(prompt.value)])
        }
        else if (prompt.type == "function") {
            console.log("in prompt type function")
            const promptFunction = require(promptsPath + '/' + prompt['value'])
            const promptResponse = await promptFunction(senderId, app)
            console.log('Prompt response from function--------------------------------------->', promptResponse)
            // const response = [{
            //     "type" : "textmessage",
            //     'message' : promptResponse
            // }]
            resolve(promptResponse)
        }
    })
}

module.exports = sendMessage