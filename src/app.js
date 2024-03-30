import express from "express";
import cors from "cors";
import morgan from "morgan";
import bhashini from 'bhashini-translation';

import asrRoutes from './routes/asr.routes.js';
import asrNmtRoutes from './routes/asr_nmt.routes.js';
import nmtRoutes from './routes/nmt.routes.js';
import ttsRoutes from './routes/tts.routes.js';
import nmtTtsRoutes from './routes/nmt_tts.routes.js';
import asrNmtTtsRoutes from './routes/asr_nmt_tts.routes.js';


import * as middleware from "./utils/middleware.js";
import helloRoute from "./routes/helloRouter.js";

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// enable cors
app.use(cors());

// request logger middleware
app.use(morgan("tiny"));
const BHASHINI_USER_ID = 'c52783f465184b9ca6cd7cc26f5cd1aa';
const BHASHINI_ULCA_API_KEY = '365a9b416f-7998-4c9c-bcd2-e3895fc30dc0';
const BHASHINI_INFERENCE_API_KEY = '-ZMTsWoHLAsGSKpgnvuwPF3LJUK71XPdYxnMPW6dC55JfDa_Sgy4vYi6JHi7ZnE0';
bhashini.auth(BHASHINI_USER_ID, BHASHINI_ULCA_API_KEY, BHASHINI_INFERENCE_API_KEY);

// Routes
app.use('/asr_nmt', asrNmtRoutes);
app.use('/nmt', nmtRoutes);
app.use('/tts', ttsRoutes);
app.use('/nmt_tts', nmtTtsRoutes);
app.use('/asr_nmt_tts', asrNmtTtsRoutes);
app.post('/asr', async (req, res) => {
  let { sourceLang, base64Audio } = req.body;
  try {
    let lang1= sourceLang;
    const result = await bhashini.asr(lang1, base64Audio);
    res.json({result});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
app.use("/hello", helloRoute);


// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
