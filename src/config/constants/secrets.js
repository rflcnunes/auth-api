import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;

export const API_SECRET = env.API_SECRET ? env.API_SECRET : 'dGVzdC1ibGFibGFibGEtdGVzdC0xMjM0NTY=';