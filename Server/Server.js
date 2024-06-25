// Node.js Server - server.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Medical Chatbot Server');
});

// Route to handle asking questions
app.post('/ask', async (req, res) => {
  try {
    const  question  =  req.body.message;
    console.log('Received question:', req.body.message);  // Log the received question
    
    // Make a POST request to Flask API
    const flaskResponse = await axios.post('http://localhost:8080/ask', { question });
    
    console.log('Flask response:', flaskResponse.data.answer);  // Log the Flask API response
    
    // Extract the answer from Flask response
    const  answer  = flaskResponse.data.answer;
    console.log('Answer:', answer);  // Log the extracted answer
    
    // Respond with the answer
    res.json({ answer });
  } catch (error) {
    console.error('Error while asking question:', error.message);
    res.status(500).json({ error: 'Error while asking question' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
