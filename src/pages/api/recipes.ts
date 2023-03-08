// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompts = req.body;

  if(!prompts) return res.status(400).json({name: "Invalid Prompts"});

  const getRecipes = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Dados os seguintes ingredientes: ${prompts}, me dê 5 receitas possíveis usando apenas esses ingredientes`,
    max_tokens: 4096,
    temperature: 0.5,
    presence_penalty: 0,
    frequency_penalty: 0
  });

  const recipe = getRecipes.data.choices[0]?.text;

  res.send(recipe)
}
