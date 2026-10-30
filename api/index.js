export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  const API_KEY = process.env.OPENROUTER_API_KEY;

  if (!API_KEY) return res.status(500).json({ error: 'API key missing' });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://basmat-najah-6pzi.vercel.app", // مطلوب من OpenRouter
        "X-Title": "Basmat Najah" // مطلوب من OpenRouter
      },
      body: JSON.stringify({
      model: "google/gemma-4-26b-a4b-it:free",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
       throw new Error(data.error?.message || 'Error from OpenRouter');
    }

    const reply = data.choices?.[0]?.message?.content || 'عذراً، لم أفهم.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
}
