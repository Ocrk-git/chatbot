const User = require("../db/dbModels/userModel")

const MessageUpdateInDB = async (senderType, message, sender) => {
    const user = await User.findOne({userId : sender})
    const timeStamp = new Date()
    console.log("timeStamp" ,timeStamp)
    user.conversation = user.conversation.concat({type : senderType, message})
    let botMessageFromDB = await User.findByIdAndUpdate({_id : user._id}, user,{new : true})
    return botMessageFromDB.conversation[botMessageFromDB.conversation.length -1]
}

module.exports = MessageUpdateInDB