export const msg_data = (message) => {
    return async (dispatch) => {
      try {
        // Simulate sending message to backend or external service
        // const response = await axios.post('/api/chat', { message });
        // const reply = response.data.reply;
  
        // Dispatch action to add message to Redux state with role identifier
        dispatch({
          type: 'msg',
          payload: { role: 'user', text: message },
        });
        dispatch({
          type: 'msg',
          payload: { role: 'bot', text: "yes how i " },
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };
  };