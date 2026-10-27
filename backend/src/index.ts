import express, { type Express, type Request, type Response } from 'express';
import { errorHandler } from './middleware/errorHandler.ts';
import { AppError } from './errors/AppError.ts';
import { z } from 'zod';
import { validate } from './middleware/validate.ts';

const app: Express = express();
app.use(express.json());
const PORT = Number(process.env.PORT ?? 3000);

app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

app.use((_req, _res) => {
  throw new AppError(404, 'Not Found');
});

app.use(errorHandler);
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
});
