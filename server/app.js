const express = require("express");
const http = require("http");
const path = require("path");
const crypto = require("crypto-js")
const socketio = require("socket.io");
//Database connection
require("../server/src/db/mongoose")
const userDb = require("../server/src/db/dbModels/userModel")

const client = require("./src/utils/context.js");
const botResponse = require("./src/botResponse");
const MessageUpdateInDB = require("../server/src/utils/updateMessageInDB")
const { sendQuickReply } = require("./src/utils/messageObject");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const syncApiRouter = require("../server/src/routers/syncApi")
const userMsgsRouter = require("../server/src/routers/userMessages")

const publicDirectoryPath = path.join(__dirname, "./public/");

const port = process.env.PORT || 5000;
const cryptoSecretKey = process.env.CRYPTO_SECRET_KEY

app.use(express.static(publicDirectoryPath));
app.use(express.json())
app.use(syncApiRouter)
app.use(userMsgsRouter)
// Print redis errors to the console
client.on("error", (err) => {
  console.log("Error " + err);
});

io.on("connection", async (socket) => {

  const sender = socket.id;
  console.log("secret key", process.env.CRYPTO_SECRET_KEY)
  console.log("new web socket connection", sender);
  const startTime = new Date()

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
  
  var encryptedBotWelcomeMessage = await crypto.AES.encrypt(JSON.stringify([sendQuickReply(welcomeMessage)]), cryptoSecretKey).toString();
  const newUser = new userDb({
    userId: sender, startTime,
    conversation: {
      type: "bot",
      message: encryptedBotWelcomeMessage
    }
  })
  await newUser.save()
  socket.emit("welcome", encryptedBotWelcomeMessage);

  socket.on("sendMessage", async (userMessage, callback) => {
    await MessageUpdateInDB("user", userMessage, sender)
    var bytes = crypto.AES.decrypt(userMessage, cryptoSecretKey);
    var decrptedUserMessage = bytes.toString(crypto.enc.Utf8);
    console.log("decrypted message", decrptedUserMessage)
    const botMessage = await botResponse(decrptedUserMessage, sender);
    var encryptedBotMessage = await crypto.AES.encrypt(JSON.stringify(botMessage), cryptoSecretKey).toString();
    console.log("bot Message", encryptedBotMessage)
    await MessageUpdateInDB("bot", encryptedBotMessage, sender)
    socket.emit("botMessage", encryptedBotMessage);
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
