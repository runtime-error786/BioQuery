
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Medical Chatbot Server');
});

app.get('/api/chat', (req, res) => {
  res.json(messages);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
