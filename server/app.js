const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
//Database connection
require("../server/src/db/mongoose")
const userDb = require("../server/src/db/dbModels/userModel")

const client = require("./src/utils/context.js");
const botResponse = require("./src/botResponse");
const { sendQuickReply } = require("./src/utils/messageObject");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "./public/");

const port = process.env.PORT || 5000;

app.use(express.static(publicDirectoryPath));

// Print redis errors to the console
client.on("error", (err) => {
  console.log("Error " + err);
});

io.on("connection", async (socket) => {
  
  const sender = socket.id;
  console.log("new web socket connection", sender);
  const startTime = new Date()
  const newUser = new userDb ({ userId: sender, startTime })
  await newUser.save()
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
    const botMessage = await botResponse(userMessage, sender);
    console.log("bot Message",botMessage);
    socket.emit("botMessage", botMessage);
  });

  //sending default message

  socket.on("ocrk_home", () => {
    console.log("default message");
    try {
      client.del(sender);
      console.log(`Deleting context for sender ${sender}`);
    } catch (e) {
      console.log("Error", e);
    }
    socket.emit("botMessage", [sendQuickReply(welcomeMessage)]);
  })

  // Deleting sender's context on disconnect
  socket.on("disconnect", async () => {
    try {
      client.del(sender);
      const user = await userDb.findOne({ userId: sender })
      const startTime = user.startTime
      const endTime = new Date()
      const sessionPeriod = (Math.round(endTime.getTime() / 1000) - Math.round(startTime.getTime() / 1000))
      await userDb.findByIdAndUpdate(user._id, { endTime, sessionPeriod }, { new: true, runValidators: true })
      console.log(`Deleting context for sender ${sender}`);
    } catch (e) {
      console.log("Error", e);
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
