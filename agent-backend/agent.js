const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');
const express = require('express');
const router = express.Router();

const model = new OpenAI({ openAIApiKey: 'YOUR_OPENAI_API_KEY' });

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"]
});

async function generateText(product) {
  const input = await prompt.formatPromptValue({ product });
  const response = await model.call(input);
  return response;
}

router.post('/generate', async (req, res) => {
  const { product } = req.body;
  try {
    const response = await generateText(product);
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


module.exports = router;


// Example usage
generateText(" harkirat is bad boy ")
  .then(console.log)
  .catch(console.error);