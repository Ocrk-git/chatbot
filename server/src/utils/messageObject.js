const sendTextMessage = (message) => {
  return {
    type: "text",
    message: message,
  };
};

const sendQuickReply = (message) => {
  return {
    type: "quickReply",
    ...message,
  };
};

const sendCards = (message) => {
  return {
    type: "cards",
    message,
    options: {},
  };
};

const sendImage = (message) => {
  console.log("In send  image function",message);
  return {
    type: "image",
    url: message,
  };
};

const sendVideo = (message) => {
  return {
    type: "video",
    url: message,
  };
};

module.exports = {
  sendTextMessage,
  sendQuickReply,
  sendCards,
  sendImage,
  sendVideo,
};
