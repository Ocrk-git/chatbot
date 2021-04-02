const spawn = require('child_process').spawn

const pullIntent = (userMessage) => {
    return new Promise((resolve,reject) => {
        let pythonFile = __dirname + "/load_model.py"
        let pythonModel = spawn('python', [pythonFile, userMessage])
        pythonModel.stdout.on('data', (data) => {
            console.log(data.toString(), "Data from python")
            resolve(data.toString())
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