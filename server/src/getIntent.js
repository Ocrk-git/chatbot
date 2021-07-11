const spawn = require('child_process').spawn
const request = require('request');

var prediction = {}
const pullIntent = (userMessage) => {
    return new Promise((resolve, reject) => {
        const options = {
            'method': 'GET',
            'url': `http://localhost:8000/predict?utterance=${userMessage}`,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) {
                reject(error);
            }
            else {
                const body= JSON.parse(response.body);
                console.log("Body from predict API", body.intent);
                console.log("Body from predict API", body.confidence);
                resolve(body);
            }
        });

        // let pythonFile = __dirname + "/nlp/prediction.py"
        // let pythonModel = spawn('python', [pythonFile, userMessage])
        // pythonModel.stdout.on('data', (data) => {
        //     // console.log(data.toString(), "Data from python")
        //     data = JSON.parse(data)
        //     resolve(data)
        // })

        // pythonModel.stderr.on('data', (data) => {
        //     console.error(`stderr: ${data}`);
        //     reject(data.toString())
        // });

        // pythonModel.on('close', (code) => {
        //     console.log(`child process exited with code ${code}`);
        // });
    })
}


module.exports = {
    pullIntent
}