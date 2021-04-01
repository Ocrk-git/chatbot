// const context = require('./context')
const path = require('path')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('./messageObject')
const promptsPath = path.join(__dirname, '../prompts')
const sendMessage = (prompt,senderId) => {
    return new Promise(async resolve => {
        console.log('prompt from send message', prompt)
        if (prompt.type == "text") {
            resolve([sendTextMessage(prompt.value)])
        }
        else if (prompt.type == "quickReply") {
            resolve([sendQuickReply(prompt.value)])
        }
        else if (prompt.type == "card") {
            resolve([sendCards(prompt.value)])
            
        }
        else if (prompt.type == "image") {
            resolve([sendImage(prompt.value)])

        }
        else if (prompt.type == "video") {
            resolve([sendVideo(prompt.value)])
            
        }
        else {
            const promptFunction = require(promptsPath + '/' + prompt['value'])
            const promptResponse = await promptFunction(senderId)
            console.log('Prompt response', promptResponse)
            // const response = [{
            //     "type" : "textmessage",
            //     'message' : promptResponse
            // }]
            resolve (promptResponse)
        }
    })
}

module.exports = sendMessage