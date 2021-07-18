const express = require("express");
const http = require("http");
const path = require("path");
const crypto = require("crypto-js");
const socketio = require("socket.io");
//Database connection
require("../server/src/db/mongoose");
const userDb = require("../server/src/db/dbModels/userModel");

const client = require("./src/utils/context.js");
const botResponse = require("./src/botResponse");
const MessageUpdateInDB = require("../server/src/utils/updateMessageInDB");
const { sendQuickReply, sendTextMessage, sendCards } = require("./src/utils/messageObject");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const syncApiRouter = require("../server/src/routers/syncApi")
const userMsgsRouter = require("../server/src/routers/userMessages")
const journeysRouter = require("../server/src/routers/journeys")
const trainingRouter = require("../server/src/routers/training")


const publicDirectoryPath = path.join(__dirname, "./public/");

const port = process.env.PORT || 5000;
const cryptoSecretKey = process.env.CRYPTO_SECRET_KEY;

app.use(express.static(publicDirectoryPath));

app.use(express.json())
app.use(syncApiRouter)
app.use(userMsgsRouter)
app.use(journeysRouter)
app.use(trainingRouter)

// Print redis errors to the console
client.on("error", (err) => {
  console.log("Error " + err);
});

io.on("connection", async (socket) => {
  const sender = socket.id;
  // console.log("secret key", process.env.CRYPTO_SECRET_KEY);
  console.log("new web socket connection", sender);
  const startTime = new Date();

  const welcomeMessage = [
    sendTextMessage("Hi, Welcome to Bhavani constructions, I'm Maya, your didgital asisstant. I am here to assistant. I'm here to assist you with finding your dream home."),
    sendTextMessage("we have the following projects in nellore. Please select the project of your choice"),
    sendCards([{
      "title": "Bhavani Sky Towers",
      "description": "Bhavani Sky Towers is a two and three-bedroom ultra-luxury condominium project located in Iscon city main road, Kondayapalem.",
      "image": "https://cdn-bpljh.nitrocdn.com/GdpbhucsrDZBHKmQRSosxAjFIZYsjtdX/assets/static/optimized/rev-22abcd0/wp-content/uploads/2020/07/bhavani-sky-towers-1.jpg",
      "actions": [
        {
          "title": "Know more",
          "text": "Bhavani sky towers more"
        },
        {
          "title": "Intrested",
          "text": "intrested"
        }
      ]
    },
    {
      "title": "Bhavani Newtown",
      "description": "Discover smart living across 36+ exquisite villas spread across 3 lush acres in phase - 1, designed for the complete family and are sensitive to the needs of children and the elderly located in Dhanalakshmipuram.",
      "image": "https://cdn-bpljh.nitrocdn.com/GdpbhucsrDZBHKmQRSosxAjFIZYsjtdX/assets/static/optimized/rev-22abcd0/wp-content/uploads/2021/04/8-1.png",
      "actions": [
        {
          "title": "Know more",
          "text": "Bhavani Newtown more"
        },
        {
          "title": "Intrested",
          "text": "intrested"
        }
      ]
    },
    {
      "title": "Bhavani Fortune Prime",
      "description": "Discover boutique lifestyle 3BHK apartments located in Children's park road, Jagadeesh Nagar",
      "image": "https://cdn-bpljh.nitrocdn.com/GdpbhucsrDZBHKmQRSosxAjFIZYsjtdX/assets/static/optimized/rev-22abcd0/wp-content/uploads/2021/04/9.png",
      "actions": [
        {
          "title": "Know more",
          "text": "Bhavani Fortune Prime more"
        },
        {
          "title": "Intrested",
          "text": "intrested"
        }
      ]
    }])
  ]

  var encryptedBotWelcomeMessage = await crypto.AES.encrypt(
    JSON.stringify(welcomeMessage),
    cryptoSecretKey
  ).toString();
  const newUser = new userDb({
    userId: sender,
    startTime,
    conversation: {
      type: "bot",
      message: encryptedBotWelcomeMessage,
    },
  });
  let newUserFromDB = await newUser.save();
  socket.emit("welcome", newUserFromDB.conversation[0]);

  socket.on("sendMessage", async (userMessage, callback) => {
    await MessageUpdateInDB("user", userMessage, sender);
    var bytes = crypto.AES.decrypt(userMessage, cryptoSecretKey);
    var decrptedUserMessage = bytes.toString(crypto.enc.Utf8);
    console.log("decrypted message", decrptedUserMessage);
    const botMessage = await botResponse(decrptedUserMessage, sender);
    // console.log("Message", JSON.stringify(botMessage));
    var encryptedBotMessage = await crypto.AES.encrypt(
      JSON.stringify(botMessage),
      cryptoSecretKey
    ).toString();
    // console.log("bot Message", encryptedBotMessage);
    let botMessageFromDB = await MessageUpdateInDB("bot", encryptedBotMessage, sender);
    // console.log("Bot message before emit", botMessageFromDB.message)
    // console.log("Bot message check",encryptedBotMessage)
    // Have to use this after jilani's 
    socket.emit("botMessage", botMessageFromDB)

  });

  //sending default message

  socket.on("ocrk_home", () => {
    // console.log("default message");
    try {
      client.del(sender);
      console.log(`Deleting context for sender ${sender}`);
    } catch (e) {
      console.log("Error", e);
    }
    socket.emit("botMessage", encryptedBotWelcomeMessage);
  });

  // Deleting sender's context on disconnect
  socket.on("disconnect", async () => {
    try {
      client.del(sender);
      const user = await userDb.findOne({ userId: sender });
      const startTime = user.startTime;
      const endTime = new Date();
      const sessionPeriod =
        Math.round(endTime.getTime() / 1000) -
        Math.round(startTime.getTime() / 1000);
      await userDb.findByIdAndUpdate(
        user._id,
        { endTime, sessionPeriod },
        { new: true, runValidators: true }
      );
      console.log(`Deleting context for sender ${sender}`);
    } catch (e) {
      console.log("Error", e);
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
