import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.ts';
import { ZodError } from 'zod';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({ error: 'Validation Failed.', details: err.issues });
    return;
  }

  // catch json parsing error
  if (
    err instanceof SyntaxError &&
    'type' in err &&
    err.type === 'entity.parse.failed'
  ) {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
