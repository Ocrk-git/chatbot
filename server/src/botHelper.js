const client = require('./utils/context')
const { pullIntent } = require('./getIntent')

function App(sender, utterance) {
    this.sender = sender
    this.minConfidence = 0.85
    this.data = {
        "message": utterance
    }
    this.context = {}
    this.predict = async (utterance) => {
        prediction = await pullIntent(utterance)
        return prediction
    }
    this.prediction = this.predict(utterance)
    client.get(sender, (err, result) => {
        if (result) {
            this.context = JSON.parse(result)
        }
    })
    this.setContext = (sender, data, newJourney = false) => {
        return new Promise((resolve, reject) => {
            console.log("data from set context", data)
            client.get(sender, async (err, currentContext) => {
                console.log("current context", currentContext)
                if (err) {
                    console.log("No context found::", err)
                    reject(err)
                    // client.setex(this.sender, 3600, JSON.stringify({ ...data, "contextHistory": [] }))
                }
                else {
                    if (typeof currentContext == "object") {
                        await client.setex(this.sender, 3600, JSON.stringify({ ...data, "contextHistory": [] }))
                        resolve()
                    }
                    else {
                        currentContext = JSON.parse(currentContext)
                        console.log("current context", currentContext)
                        let { contextHistory } = currentContext
                        if (newJourney == false) {
                            await client.setex(this.sender, 3600, JSON.stringify({ ...data, contextHistory }))
                            resolve()
                        }
                        else {
                            if (contextHistory.length < 5) {
                                contextHistory.push({ [currentContext.journey]: currentContext.context })
                                await client.setex(this.sender, 3600, JSON.stringify({ ...data, contextHistory }))
                                resolve()
                            }
                            else {
                                contextHistory.shift()
                                contextHistory.push({ [currentContext.journey]: currentContext.context })
                                await client.setex(this.sender, 3600, JSON.stringify({ ...data, contextHistory }))
                                resolve()
                            }
                        }
                    }
                }
            })
        })
    }
    // })
    // }
    this.getContext = (sender) => {
        return new Promise(async (resolve, reject) => {
            try {
                let currentContext = await client.get(sender)
                currentContext = JSON.parse(currentContext)
                resolve(currentContext)
            } catch (err) {
                console.log("error while getting context ::", err)
                reject(err)
            }
        })
    }
    // TODO: 
    // 1. app.sendTextMessage, app.sendQuickReplies, app.sendCards, app.sendImage, app.sendVideo, app.sendDocument
    // 2. app.triggerIntent
    // 3. app.setStep, app.setMultipleSteps
    // 4. app.executeFunction
    // 5. app.clearContext

    // 6. app.profile
    // 7. app.dataBase.find, app.dataBase.update, app.dataBase.delete, app.dataBase.insert
}

module.exports = App