const sendTextMessage = (message) =>{
    return {
        "type" : 'text',
        'message' : message
    }
}

const sendQuickReply = (message) =>{
    return {
        'type' : "quickReply",
        "messsage" : message
    }
}

const sendCards = (message) => {
    return {
        "type" : "card",
        "message" : message
    }
}

const sendImage = (message) => {
    return {
        "type" : "image",
        "message" : message
    }
}

const sendVideo = (message) => {
    return {
        "type" : "video",
        "message" : message
    }
}

module.exports = {
    sendTextMessage,
    sendQuickReply,
    sendCards,
    sendImage,
    sendVideo
}