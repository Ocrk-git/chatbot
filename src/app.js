const express = require('express')
const http = require('http')
const path = require('path')
const { send } = require('process')
const socketio = require('socket.io')
const spawn = require('child_process').spawn
// const { generateYoutubeVideos } = require('./youtubeSeach')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, "../public")
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

app.get('/prediction', (req, res) => {
    console.log("Python end point", req.query.message)
    console.log("Python Path", __dirname + "/load_model.py")
    let pythonFile = __dirname + "/load_model.py"
    let pythonModel = spawn('python', [pythonFile, req.query.message])
    pythonModel.stdout.on('data', (data) => {
        console.log(data.toString(), "Data from python")
        return res.send(data).status(200)
    })

    pythonModel.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        return res.send("Error").status(400)
    });

    pythonModel.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
})

io.on('connection', (socket) => {
    const sender = socket.id
    console.log("new web socket connection", sender)
    const welcomeMessage = {
        title: "Hello! I am Edith, your virtual assistant for Entiretyin. How can I help you?",
        options: [
            {
                title: "Raise Ticket"
            },
            {
                title: "View Ticket Status"
            },
            {
                title: "Frequently Asked Questions"
            }
        ]
    }
    socket.emit('welcome', welcomeMessage)

    socket.on('sendMessage', async ({ userMessage, context }, callback) => {
        console.log(userMessage)
        console.log("sender id", socket.id)
        console.log("Context", context)
        if (context && context != []) {
            // context = JSON.parse(context)
            socket.emit('message', context[0])
        }
        else {
            let pythonFile = __dirname + "/load_model.py"
            let pythonModel = spawn('python', [pythonFile, userMessage])
            pythonModel.stdout.on('data', (data) => {
                console.log(data.toString(), "Data from python")
                socket.emit('message', data.toString())
            })

            pythonModel.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            pythonModel.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        }
        // const videoIframes = await generateYoutubeVideos(userMessage)
        // console.log("Videos in app.js",videoIframes)
        // socket.emit('videoIframes', videoIframes)
    })

})


server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})