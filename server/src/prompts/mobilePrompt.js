const client = require('../utils/context.js')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('../utils/messageObject')
const context = (senderId) => {
    return new Promise(resolve =>{
        client.get(senderId, (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                result = JSON.parse(result)
                console.log("context from prompt", result)
                const userName = result['context'].find((step)=>{
                    if(step.stepName = 'ask-name'){
                        return step.stepValue
                    }
                })
                const userMsg = `Hope you are doing great ${userName.stepValue}, Please provide your mobile number.`
                resolve([sendTextMessage(userMsg)])
            }
        })
    })
}

module.exports = context