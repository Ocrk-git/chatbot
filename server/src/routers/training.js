const spawn = require('child_process').spawn
const express = require('express')
const path = require('path')
const router = new express.Router()

const trainModel = (startTime) => {
    return new Promise((resolve, reject) => {
        console.log("In train model")
        let pythonFile = path.join(__dirname, '../nlp_model.py');
        console.log(pythonFile)
        // let pythonFile = __dirname + "/nlp_model.py"
        let pythonModel = spawn('python', [pythonFile])

        pythonModel.stdout.on('data', (data) => {
            data = data.toString().trim()
            const endTime = new Date().getTime()
            const timeElapsed = `${(endTime - startTime)/1000}s`
            const response = {
                data,
                timeElapsed
            }
            return resolve(response)
        })

        pythonModel.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            return reject(data.toString())
        });
    })
}

router.get('/train', async (req, res) => {
    const startTime = new Date().getTime()
    try{
        const result = await trainModel(startTime)
        return res.status(200).send(result)
    }
    catch(error){
        return res.status(500).send({ error })
    }

})

module.exports = router
