import express from 'express';
import bhashini from 'bhashini-translation';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sourceLang, targetLang, text } = req.body;
  try {
    const translation = await bhashini.nmt(sourceLang, targetLang, text);
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
