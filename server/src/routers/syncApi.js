const express = require('express')
const botResponse = require("../botResponse")

const router = new express.Router()

router.post("/ocrk/message", async (req,res)=> {
    console.log('request body',req.body)
    try {
        if(!req.body.sender || !req.body.message) {
            return res.status(400).send("missing required data")
        }
        const response = await botResponse(req.body.message, req.body.sender)
        res.send(response)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router