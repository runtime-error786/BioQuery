import axios from 'axios';

export const msg_data = (c) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "msg",
        payload:c
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };
};