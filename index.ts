import { AnthropicChatApi } from 'llm-api';

const prompt = `Hello!`;

async function run() {
  const client = new AnthropicChatApi(
    {
      apiKey: process.env.ANTHROPIC_KEY ?? 'YOUR_client_KEY',
    },
    { stream: true, temperature: 0 },
  );

  const res = await client.textCompletion(prompt);
  console.log('Response', res);
}

run();
