const {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
} = require('../utils/messageObject')

const promptSiteDetails = (senderId) => {
    return new Promise(resolve => {
        const type = 1
        if (type == 1) {
            resolve([sendCards([{
                "image": "https://cdn.yellowmessenger.com/wGDI4FNpwxk61617085099835.jpeg",
                "title": "Opening hours",
                "description": `MON-FRI 9:00 - 6:00\n
SAT-SUN 9:00 - 3:00\n
Address: Childrens Park Rd, Pinakini Avenue,
Balaji Nagar, Nellore, Andhra Pradesh 524002`
            }])])
        }
        else if (type == 2) {
            resolve([sendCards([{
                "image": "https://cdn.yellowmessenger.com/wGDI4FNpwxk61617085099835.jpeg",
                "title": "Opening hours",
                "description": "Description"
            }])
            ])
        }
        else {
            resolve([sendCards([{
                "image": "https://cdn.yellowmessenger.com/wGDI4FNpwxk61617085099835.jpeg",
                "title": "Opening hours",
                "description": "Description"
            }])
            ])
        }
    })
}

module.exports = promptSiteDetails