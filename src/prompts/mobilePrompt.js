const client = require('../utils/context.js')
// const  sendTextMessage = require('../utils/sendingMessage')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('../utils/messageObject')
const context = (senderId) => {
    return new Promise(resolve =>{
        // sendmessage('HEllo, Hi')
        client.get(senderId, (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                result = JSON.parse(result)
                const userName = result['context'].find((step)=>{
                    if(step.stepName = 'ask-name'){
                        return step.stepValue
                    }
                })
                console.log('user Name', userName)
                const userMsg = `Hi ${userName.stepValue}, Please provide your mobile number.`
                // resolve(userMsg)
                resolve([sendTextMessage(userMsg)])
            }
        })
    })
}

module.exports = context