import express from 'express';
import bhashini from 'bhashini-translation';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/', async (req, res) => {
  const { sourceLang, text, gender } = req.body;
  try {
    const audioData = await bhashini.tts(sourceLang, text, gender);
    
    // Get the directory name of the current module
    const __dirname = path.dirname(new URL(import.meta.url).pathname);

    // Generate a unique filename for the audio file
    const fileName = `audio_${Date.now()}.mp3`;
    const filePath = path.join(__dirname, '..', 'public', 'audio', fileName);
    
    // Write the audio data to a file
    fs.writeFileSync(filePath, audioData, 'binary');

    // Send the URL of the saved audio file in the response
    res.json({ audioUrl: `/audio/${fileName}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
