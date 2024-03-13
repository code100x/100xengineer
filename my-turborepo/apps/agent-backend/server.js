require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const langchainClient = {
  async query(prompt) {
    return `Response to: ${prompt}`;
  },
};

app.post('/generate-text', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      max_tokens: 150,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).send("Error generating text");
  }
});

app.post('/api/execute-command', async (req, res) => {
  try {
    const { command } = req.body;
    if (!command) {
      return res.status(400).send({ error: 'No command provided' });
    }
    const result = await langchainClient.query(command);
    res.send({ result });
  } catch (error) {
    console.error('Error executing command:', error);
    res.status(500).send({ error: 'Failed to execute command' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
