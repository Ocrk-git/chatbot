// const context = require('./context')
const path = require('path')
const promptsPath = path.join(__dirname, '../prompts')
const sendMessage = (prompt,senderId) => {
    return new Promise(async resolve => {
        console.log('prompt from send message', prompt)
        if (prompt.type == "text") {
            resolve(prompt.value)
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