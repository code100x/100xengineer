import { Router } from "express"
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import axios from "axios";
const router = Router();

router.post('/chat', async (req, res) => {
  const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: "mistral",
      prompt: req.body.input,
      context: req.body.context,
      stream: false
  });
  res.json({ message: ollamaResponse.data.response, context: ollamaResponse.data.context });
});

export default router;