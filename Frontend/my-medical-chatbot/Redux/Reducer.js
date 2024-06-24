const initialState = []; // Initialize as an empty array

const Chat = (state = initialState, action) => {
    switch (action.type) {
      case "msg":
        return [...state, action.payload]; // Append new message to the array
      default:
        return state;
    }
  };
  
  export  {Chat};
