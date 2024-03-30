import express from 'express';
import bhashini from 'bhashini-translation';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sourceLang, targetLang, base64Audio, gender } = req.body;
  try {
    const audioData = await bhashini.asr_nmt_tts(sourceLang, targetLang, base64Audio, gender);
    res.json({ audioData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
