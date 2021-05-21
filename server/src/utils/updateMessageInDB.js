const User = require("../db/dbModels/userModel")

const MessageUpdateInDB = async (senderType, message, sender) => {
    const user = await User.findOne({userId : sender})
    
    user.conversation = user.conversation.concat({type : senderType, message})
    await User.findByIdAndUpdate({_id : user._id}, user)
}

module.exports = MessageUpdateInDB