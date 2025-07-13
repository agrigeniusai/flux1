import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import fluxRouter from './routes/flux.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(rateLimit({ windowMs: 60000, max: 100 }));

const cache = new NodeCache({ stdTTL: 600 });
app.set('cache', cache);

app.use('/api/flux', fluxRouter);

app.listen(PORT, () => console.log(`🌍 Server ready on :${PORT}`)); 