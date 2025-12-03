import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: `Você é um especialista em criar interfaces web modernas e bonitas.

Crie uma interface HTML completa e estilizada com base nesta descrição: "${description}"

IMPORTANTE:
- Retorne APENAS o código HTML completo
- Inclua CSS inline ou em uma tag <style> no <head>
- Use design moderno, cores bonitas e responsivo
- Adicione funcionalidades básicas com JavaScript se necessário
- Use Flexbox ou Grid para layouts
- Não inclua explicações, apenas o código HTML puro

O código deve começar com <!DOCTYPE html> e ser completo e pronto para usar.`,
      }],
      max_tokens: 4096,
      temperature: 0.7,
    });

    const htmlCode = completion.choices[0].message.content;

    return res.status(200).json({ html: htmlCode });
  } catch (error) {
    console.error('Error generating UI:', error);
    return res.status(500).json({ error: 'Failed to generate UI: ' + error.message });
  }
}
