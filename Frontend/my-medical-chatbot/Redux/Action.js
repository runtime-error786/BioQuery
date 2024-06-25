import axios from "axios";

export const msg_data = (message) => {
    return async (dispatch) => {
      try {
        dispatch({
            type: 'msg',
            payload: { role: 'user', text: message },
          });

        const response = await axios.post('http://localhost:5000/ask', { message });
        const reply = response.data.answer;
        console.log(reply)
  
        // Dispatch action to add message to Redux state with role identifier
        
        dispatch({
          type: 'msg',
          payload: { role: 'bot', text: reply },
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
  };