const express = require('express')
const Journey = require('../db/dbModels/journeyModel')
const router = new express.Router()
const asyncForLoop = require('../utils/asyncForEach')
const { object } = require('../utils/context')

// Journey Endpoints
// Create Journey

// TODO: Should take only unique stepnames in post and patch
router.post('/journeys/:journeyName', async (req, res) => {
    try {
        const { journeyName } = req.params
        const journeySlug = journeyName.toLowerCase().split(" ").join("-")
        const { utterances, flow } = req.body

        const getSlugs = ((stepName) => {
            stepName.toLowerCase().split(" ").join("-")
        })

        if (flow) {

            if (typeof flow != "object") {
                return res.status(400).send({ error: "Flow must be an array" })
            }
            const slugs = flow.slice(0, flow.length - 1).map(step => getSlugs(step.stepName))
            const uniqueSlugs = [...new Set(slugs)]
            if (slugs.length != uniqueSlugs.length) {
                return res.status(400).send({ error: "Steps names should be unique" })
            }
        }

        if (utterances && typeof utterances != object) {
            return res.status(400).send({ error: "Utterances must be an array" })
        }

        const journey = new Journey({
            journeyName,
            journeySlug,
            utterances: typeof utterances == undefined ? [] : utterances,
            flow: typeof flow == undefined ? [] : flow
        })
        await journey.save()
        res.status(201).send(journey)
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// List Journeys
router.get('/journeys', (req, res) => {
    try {
        Journey.find({}, (error, journeys) => {
            if (error) {
                return res.status(500).send({ error })
            }
            journeys = journeys.map(journey => (({ _id, journeyName, journeySlug }) => ({ _id, journeyName, journeySlug }))(journey))
            res.status(200).send(journeys)
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Show Journey Details
router.get('/journeys/:journeySlug', (req, res) => {
    try {
        const { journeySlug } = req.params
        Journey.findOne({ journeySlug }, (error, journey) => {

            if (error) {
                return res.status(500).send({ error })
            }

            res.status(200).send(journey)
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Delete Journey
router.delete('/journeys/:journeySlug', (req, res) => {
    try {
        const { journeySlug } = req.params
        Journey.deleteOne({ journeySlug }, (error, journey) => {

            if (error) {
                return res.status(500).send({ error })
            }

            res.status(200).send(journey)
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Utterance Endpoints
// Get utterances of a journey
router.get('/journeys/:journeySlug/utterances', (req, res) => {
    try {
        const { journeySlug } = req.params
        Journey.findOne({ journeySlug }, (error, journey) => {

            if (error) {
                return res.status(500).send({ error })
            }

            const { utterances } = journey
            res.status(200).send({ utterances })
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Add utterances to a journey
router.patch('/journeys/:journeySlug/utterances', (req, res) => {
    try {
        const { journeySlug } = req.params
        Journey.findOne({ journeySlug }, async (error, journey) => {

            if (error) {
                return res.status(500).send({ error })
            }

            const { utterances } = req.body
            if (!utterances || typeof utterances !== "object") {
                return res.status(400).send({ error: "An array of utterances is required" })
            }

            const updatedUtterances = [...journey.utterances]
            await asyncForLoop(utterances, (utterance, i) => {
                const index = updatedUtterances.findIndex(item => utterance.toLowerCase() === item.toLowerCase())
                if (index === -1) {
                    updatedUtterances.push(utterance);
                }
            })

            journey.utterances = updatedUtterances
            journey.save()
            res.status(200).send({ utterances: updatedUtterances })
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Delete utterances of a journey
router.delete('/journeys/:journeySlug/utterances', (req, res) => {
    try {
        const { journeySlug } = req.params
        Journey.findOne({ journeySlug }, async (error, journey) => {

            if (error) {
                return res.status(500).send({ error })
            }

            const { utterances } = req.body
            if (!utterances || typeof utterances !== "object") {
                return res.status(400).send({ error: "An array of utterances is required" })
            }

            var updatedUtterances = journey.utterances
            const deleteUtterances = (utterance => {
                const index = updatedUtterances.findIndex(item => utterance.toLowerCase() === item.toLowerCase())
                if (index > -1) {
                    updatedUtterances.splice(index, 1);
                }
            })

            await asyncForLoop(utterances, (utterance, index) => {
                deleteUtterances(utterance)
            });

            journey.utterances = updatedUtterances
            journey.save()
            res.status(200).send({ utterances: updatedUtterances })
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Flow End-Points
// Get specific journey flow
router.get('/journeys/:journeySlug/flow', (req, res) => {
    try {
        const { journeySlug } = req.params
        Journey.findOne({ journeySlug }, (error, journey) => {

            if (error) {
                return res.status(500).send({ error })
            }

            const { flow } = journey
            res.status(200).send({ flow })
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Update journey flow
router.patch('/journeys/:journeySlug/flow', async (req, res) => {
    try {
        const { journeySlug } = req.params
        const { flow } = req.body

        const getSlugs = ((stepName) => {
            stepName.toLowerCase().split(" ").join("-")
        })
        
        if (!flow || typeof flow !== "object" || (typeof flow === "object" && flow.length == 0)) {
            return res.status(400).send({ error: "A non empty array of flow is required" })
        }

        const slugs = flow.slice(0, flow.length - 1).map(step => getSlugs(step.stepName))
        const uniqueSlugs = [...new Set(slugs)]
        if (slugs.length != uniqueSlugs.length) {
            return res.status(400).send({ error: "Steps names should be unique" })
        }

        const journey = await Journey.findOneAndUpdate({ journeySlug }, { flow }, { new: true })
        res.status(200).send({ flow: journey.flow })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Delete journey flow
router.delete('/journeys/:journeySlug/flow', async (req, res) => {
    try {
        const { journeySlug } = req.params

        let journey = await Journey.findOne({ journeySlug })
        journey.flow = []
        await journey.save()
        res.status(200).send({ flow: journey.flow })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Steps endpoints
// Add step at specific position
router.put('/journeys/:journeySlug/flow/:stepName', async (req, res) => {
    try {
        const { journeySlug, stepName } = req.params
        const { position } = req.query
        const { step } = req.body
        let journey = await Journey.findOne({ journeySlug })
        if (!position || !(position <= journey.flow.length + 1) || position == 0) {
            return res.status(400).send({ error: "Invalid position" })
        }

        if (!step || !step.prompt || (step.prompt && step.prompt.length === 0)) {
            return res.status(400).send({ error: "Invalid step data" })
        }

        let { flow } = journey

        const stepSlug = stepName.toLowerCase().split(" ").join("-")
        const isUnique = flow.every(step => step.stepSlug != stepSlug)

        if (!isUnique) {
            return res.status(400).send({ error: "A step with same name already exists" })
        }

        if (!step.validator) {
            step.validator = null
        }

        const stepData = {
            stepName,
            stepSlug,
            prompt: step.prompt,
            validator: step.validator
        }
        flow.splice(position - 1, 0, stepData)
        journey.flow = flow
        await journey.save()
        res.status(200).send({ flow: journey.flow })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Update step
router.patch('/journeys/:journeySlug/flow/:stepSlug', async (req, res) => {
    try {
        const { journeySlug, stepSlug } = req.params
        const { step } = req.body
        let journey = await Journey.findOne({ journeySlug })

        let { flow } = journey

        const isPresent = flow.map(step => step.stepSlug == stepSlug)

        if (!isPresent.includes(true)) {
            return res.status(400).send({ error: "Step doesn't exist" })
        }

        if (!step.prompt && !step.validator) {
            return res.status(400).send({ error: "Either prompt or validator should be given" })
        }

        const stepIndex = isPresent.indexOf(true)
        const currentStepData = flow[stepIndex]
        const stepData = {
            stepName: currentStepData.stepName,
            stepSlug,
            prompt: step.prompt != undefined ? step.prompt : currentStepData.prompt,
            validator: step.validator != undefined ? step.validator : currentStepData.validator
        }
        // flow[stepIndex] = stepData
        flow.splice(stepIndex, 0, stepData)
        journey.flow = flow
        const saveResult = await journey.save()
        console.log("Save result", saveResult)
        res.status(200).send({ step: journey.flow[stepIndex] })
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error })
    }
})

// Delete step
router.delete('/journeys/:journeySlug/flow/:stepSlug', async (req, res) => {
    try {
        const { journeySlug, stepSlug } = req.params
        const journey = await Journey.findOne({ journeySlug })
        let { flow } = journey

        await asyncForLoop(flow, (step, index) => {
            if (step.stepSlug == stepSlug) {
                flow.splice(index, 1)
            }
        })

        journey.flow = flow
        await journey.save()
        return res.status(200).send({ flow })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

// Update Response
router.patch('/journeys/:journeySlug/response', async (req, res) => {
    try {
        const { journeySlug } = req.params
        const { response } = req.body
        const journey = await Journey.findOne({ journeySlug })
        let { flow } = journey

        if (!response || (response && response.length == 0)) {
            return res.status(400).send({ error: "A non empty array is provided or response property in given data is missing" })
        }

        flow.splice(flow.length - 1, 1, { response })
        journey.flow = flow
        await journey.save()
        return res.status(200).send({ flow: journey.flow })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error })
    }
})

module.exports = router