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
        client.get(senderId, async (error, result) => {
            if (error) {
                resolve(error)
            }
            else {
                cards = []
                if ((/master plan|master/gi).test(app.data.message)) {
                    cards.push({ "image": 'http://bhavaniproperties.in/wp-content/uploads/2020/07/3-2-1024x780.jpg' })
                }
                else if ((/bedroom|block-a|bedroom plan|block-a plan/gi).test(app.data.message)) {
                    cards.push({ "image": 'http://bhavaniproperties.in/wp-content/uploads/2020/08/1-1024x1024.jpg' })
                    cards.push({ "image": 'http://bhavaniproperties.in/wp-content/uploads/2020/08/2-1024x1024.jpg' })
                }
                else {
                    cards.push({ "image": 'http://bhavaniproperties.in/wp-content/uploads/2020/07/3-2-1024x780.jpg' })
                    cards.push({ "image": 'http://bhavaniproperties.in/wp-content/uploads/2020/08/1-1024x1024.jpg' })
                    cards.push({ "image": 'http://bhavaniproperties.in/wp-content/uploads/2020/08/2-1024x1024.jpg' })
                }
                resolve([sendCards(cards)])
                // console.log("cards",cards)
                // resolve([sendCards([{
                //     "image": "https://cdn.yellowmessenger.com/wGDI4FNpwxk61617085099835.jpeg"
                // },
                // {
                //     "image": "https://cdn.yellowmessenger.com/wGDI4FNpwxk61617085099835.jpeg"
                // }])])
            }
        })
    })
}

module.exports = context