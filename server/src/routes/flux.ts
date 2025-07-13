import { Router } from 'express';
import axios from 'axios';
import type { Request, Response } from 'express';

const router = Router();
const NASA_KEY = process.env.NASA_API_KEY;

router.get('/current', async (req: Request, res: Response) => {
  const { lat, lon, date } = req.query;
  const key = `current:${lat},${lon},${date}`;
  const cache = req.app.get('cache');

  if (cache.has(key)) return res.json(cache.get(key));

  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/cms/flux?lat=${lat}&lon=${lon}&date=${date}&api_key=${NASA_KEY}`
    );
    cache.set(key, data);
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'NASA service unavailable' });
  }
});

router.get('/history', async (req: Request, res: Response) => {
  const { lat, lon, start, end } = req.query;
  const key = `history:${lat},${lon},${start},${end}`;
  const cache = req.app.get('cache');

  if (cache.has(key)) return res.json(cache.get(key));

  try {
    const { data } = await axios.get(
      `https://api.nasa.gov/cms/flux/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&api_key=${NASA_KEY}`
    );
    cache.set(key, data);
    res.json(data);
  } catch (e) {
    res.status(502).json({ error: 'NASA service unavailable' });
  }
});

export default router; 