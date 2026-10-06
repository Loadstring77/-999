const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6IMfqz-TbPlR8arqkKDRweLJvX8r0sVu6o14bf39OqoDQ' });

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.prompt;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userMessage,
        });
        res.json({ reply: response.text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
