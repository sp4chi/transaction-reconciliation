import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

const port = Number(process.env.PORT || 3000);
app.get('/healthz', (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(, () => {
  console.log('Server running on http://localhost:3000');
});
