const initialState = {
  showWidget: false,
  image: "https://cdn.yellowmessenger.com/DXw9dTgmHz9E1616494721521.gif",
  botName: "Amazon",
  botTitle: "Amazon",
  botDescription: "Work Hard, Have Fun, Make History",
};

const botReducer =  (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default botReducer;
