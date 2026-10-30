module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'API key missing' });
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: req.body.message }] }] })
    });
    const data = await response.json();
    res.status(200).json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
