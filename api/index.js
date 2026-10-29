module.exports = async (req, res) => {
      if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
            }

              const { message } = req.body;
                const API_KEY = process.env.GEMINI_API_KEY;

                  if (!API_KEY) {
                      return res.status(500).json({ error: 'API key not configured' });
                        }

                          try {
                              const response = await fetch(
                                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                                          {
                                                  method: 'POST',
                                                          headers: { 'Content-Type': 'application/json' },
                                                                  body: JSON.stringify({
                                                                            contents: [{ role: 'user', parts: [{ text: message }] }]
                                                                                    })
                                                                                          }
                                                                                              );

                                                                                                  if (!response.ok) {
                                                                                                        const errData = await response.json().catch(() => ({}));
                                                                                                              throw new Error(errData.error?.message || `HTTP ${response.status}`);
                                                                                                                  }

                                                                                                                      const data = await response.json();
                                                                                                                          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً.';
                                                                                                                              res.status(200).json({ reply });
                                                                                                                                } catch (err) {
                                                                                                                                    console.error('API Error:', err);
                                                                                                                                        res.status(500).json({ error: err.message });
                                                                                                                                          }
                                                                                                                                          };
}