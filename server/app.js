const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const redis = require("redis");
const { pullIntent } = require("./src/getIntent");
const journeys = require("./src/utils/journeys");
const { send } = require("process");
// const botResponse = require("botResponse")
// const { generateYoutubeVideos } = require('./youtubeSeach')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
// const { app, server, io, sendTextMessage} = require('./utils/sendingMessage')
const { sendQuickReply } = require("./src/utils/messageObject");

const sendMessage = require("./src/utils/sendMessage");

const publicDirectoryPath = path.join(__dirname, "./public/");
const validatorsPath = path.join(__dirname, "/validators");
const promptPath = path.join(__dirname, "/prompts");
const port = process.env.PORT || 5000;

app.use(express.static(publicDirectoryPath));

const client = require("./src/utils/context.js");
const { dirname } = require("path");
const botResponse = require("./src/botResponse");

// Print redis errors to the console
client.on("error", (err) => {
  console.log("Error " + err);
});

io.on("connection", (socket) => {
  // const dummy = require('../')
  // console.log(socket)
  // const { sendTextMessage } = require('./utils/sendingMessage')
  // sendTextMessage(socket)
  const sender = socket.id;
  console.log("new web socket connection", sender);
  const welcomeMessage = {
    title:
      "Hello! I am Edith, your virtual assistant for Entiretyin. How can I help you?",
    options: [
      {
        title: "Raise Ticket",
        text: "Raise Ticket",
      },
      {
        title: "View Ticket Status",
        text: "View Ticket Status",
      },
      {
        title: "Frequently Asked Questions",
        text: "Frequently Asked Questions",
      },
    ],
  };
  socket.emit("welcome", [sendQuickReply(welcomeMessage)]);

  socket.on("sendMessage", async (userMessage, callback) => {
    // console.log("User message ---->", userMessage);
    const botMessage = await botResponse(userMessage, sender);
    console.log(botMessage, "bot Message");
    socket.emit("botMessage", botMessage);
  });

  // Deleting sender's context on disconnect
  socket.on("disconnect", () => {
    try {
      client.del(sender);
      console.log(`Deleting context for sender ${sender}`);
    } catch (e) {
      console.log("Error", e);
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
