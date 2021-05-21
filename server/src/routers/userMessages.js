const express = require("express")
const User = require("../db/dbModels/userModel")
const router = new express.Router()

// router.get("/ocrk/conversations", async (req, res) => {
//     try {
//         const users = await User.find()
//         if (!users) {
//             return res.status(404).send()
//         }
//         const conversations = []
//         await users.map((user) => {
//             conversations.push({
//                 userId: user.userId,
//                 conversation: user.conversation
//             })
//         })
//         res.send(conversations)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get("/ocrk/conversations/:id", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.id })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user.conversation)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router