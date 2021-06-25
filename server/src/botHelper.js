const client = require('./utils/context')
const { pullIntent } = require('./getIntent')

function App(sender, utterance) {
    this.sender = sender
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