// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { configuration } from '@/server/openapi';
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi } from 'openai';

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const prompts = req.body;
  console.log(req.body)
  const textPrompt = `Dados os seguintes ingredientes: ${req.body}, me dê 5 receitas possíveis usando apenas esses ingredientes, nem todos os ingredientes precisam ser usados, crie possibilidades de bebidas caso seja aplicável`;

  if(!prompts) return res.status(400).json({name: "Invalid Prompts"});
  
    const getRecipes = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: textPrompt,
      temperature: 0.3,
      max_tokens: 1024,
    }).then(res => {
      console.log(res.data);
      return res.data
    })
  
     
    res.send({data: getRecipes.choices[0]?.text});
}
