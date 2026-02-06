import axios from 'axios';

export const sendMessage = async (question) => {
    try {
      const response = await axios.post(
        'https://tharindu.pythonanywhere.com/ask',
        { question: question },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // console.log('reply:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error issuing token:', error);
    }
  };
  
