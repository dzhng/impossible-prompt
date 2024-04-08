import { AnthropicChatApi } from 'llm-api';

const systemMessage = `A::B is a system with 4 tokens: 'A#', '#A', 'B#' and '#B'.

An A::B program is a sequence of tokens. Example:

    B# A# #B #A B#

To compute a program, we must rewrite neighbor tokens, using the rules:

    A# #A ... becomes ... nothing
    A# #B ... becomes ... #B A#
    B# #A ... becomes ... #A B#
    B# #B ... becomes ... nothing

In other words, whenever two neighbor tokens have their '#' facing each-other, they must be rewritten according to the corresponding rule. For example, the first example shown here is computed as:

    B# A# #B #A B# =
    B# #B A# #A B# =
    A# #A B# =
    B#

The steps were:

1. We replaced A# #B by #B A#.
2. We replaced B# #B by nothing.
3. We replaced A# #A by nothing.
4. The final result was just B#.

You will be given new programs to run within the <problem /> XML tag.
Fully compute the problem you are given, step by step, then print the final solution within the <solution /> XML tag.
`;

async function run() {
  const prompt = '<problem>A# B# #B A# A# #B #B A# A# #B A# A#</problem>';

  const client = new AnthropicChatApi(
    {
      apiKey: process.env.ANTHROPIC_KEY ?? 'YOUR_client_KEY',
    },
    { stream: true, temperature: 0 },
  );

  const res = await client.textCompletion(prompt, {
    systemMessage,
  });
  console.log('Response', res);
}

run();
