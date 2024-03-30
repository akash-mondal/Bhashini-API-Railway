import express from 'express';
import bhashini from 'bhashini-translation';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sourceLang, base64Audio } = req.body;
  try {
    const result = await bhashini.asr(sourceLang, base64Audio);
    res.json({ transcript : result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
