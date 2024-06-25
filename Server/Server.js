const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Medical Chatbot Server');
});

// Route to handle asking questions
app.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    // Make a POST request to Flask API
    const flaskResponse = await axios.post('http://localhost:8080/ask', { question });

    // Extract the answer from Flask response
    const { answer } = flaskResponse.data;

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
