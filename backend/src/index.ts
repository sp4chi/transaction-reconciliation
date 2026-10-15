import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

const PORT = Number(process.env.PORT ?? 3000);

app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed gracefully');
    process.exit(0);
  });
});
