const client = require('../utils/context.js')
const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('../utils/messageObject')
const context = (senderId) => {
    return new Promise(resolve => {
        client.get("project_name", (error, result) => {
            console.log("name from memory",result)
            if (error) {
                resolve(error)
            }
            else {
                const title = "Do you want to know more about this property?"
                const options = [
                    {
                        "title": "Yes",
                        "text": `more ${result}`
                    },
                    {
                        "title": "Register Your Interest",
                        "text": "register your interest"
                    },
                    {
                        "title": "Home",
                        "text": "home"
                    }
                ]
                resolve([sendQuickReply({title, options})])
            }
        })
    })
}

module.exports = context