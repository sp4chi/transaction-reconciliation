import pg from 'pg';

pg.types.setTypeParser(20, Number); // BIGINT ids → numbers (safe below 2^53)
// NUMERIC (money) stays a string on purpose

export const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
