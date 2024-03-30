import express from 'express';
import bhashini from 'bhashini-translation';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sourceLang, text, gender } = req.body;
  try {
    const audioData = await bhashini.tts(sourceLang, text, gender);
    res.json({ audioData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
