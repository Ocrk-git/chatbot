const client = require('../utils/context.js')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('../utils/messageObject')
const context = (senderId, app) => {
    return new Promise(resolve => {
        client.get(senderId, (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                // result = JSON.parse(result)
                // console.log("result from redis", result)
                // const rating = result['context'].find((step) => {
                //     if (step.stepName = 'ask-feedback') {
                //         return step.stepValue
                //     }
                // })
                let rating = app.data.message
                let response = ''
                if (rating > 4) {
                    response = "Thanks! we are glad you had a Great experience 😊"
                }
                else {
                    response = "We are sorry we didn't live upto your expectations. we will definetly try to improve"
                }
                resolve([sendTextMessage(response)])
            }
        })
    })
}

module.exports = context