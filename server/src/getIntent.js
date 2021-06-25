const spawn = require('child_process').spawn

var prediction = {}
const pullIntent = (userMessage) => {
    return new Promise((resolve,reject) => {
        let pythonFile = __dirname + "/nlp/prediction.py"
        let pythonModel = spawn('python', [pythonFile, userMessage])
        pythonModel.stdout.on('data', (data) => {
            // console.log(data.toString(), "Data from python")
            data = JSON.parse(data)
            resolve(data)
        })

        pythonModel.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data.toString())
        });

        pythonModel.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    })
}


module.exports = {
    pullIntent
}