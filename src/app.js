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

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());

// request logger middleware
app.use(morgan("tiny"));
const BHASHINI_USER_ID = 'user_id_value';
const BHASHINI_ULCA_API_KEY = 'Ulca_api_value';
const BHASHINI_INFERENCE_API_KEY = 'inference_api_value';
bhashini.auth(BHASHINI_USER_ID, BHASHINI_ULCA_API_KEY, BHASHINI_INFERENCE_API_KEY);

// Routes
app.use('/asr', asrRoutes);
app.use('/asr_nmt', asrNmtRoutes);
app.use('/nmt', nmtRoutes);
app.use('/tts', ttsRoutes);
app.use('/nmt_tts', nmtTtsRoutes);
app.use('/asr_nmt_tts', asrNmtTtsRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});
app.use("/hello", helloRoute);


// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
