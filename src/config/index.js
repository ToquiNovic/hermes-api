import dotenv from 'dotenv';
dotenv.config();

export const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || 'mi_base_de_datos';

export const DB_URL = process.env.DB_URL;

export const NODE_ENV = process.env.NODE_ENV;


export const DO_SPACES_KEY = process.env.DO_SPACES_KEY;
export const DO_SPACES_SECRET = process.env.DO_SPACES_SECRET;
export const DO_SPACES_REGION = process.env.DO_SPACES_REGION;
export const DO_SPACES_ENDPOINT = process.env.DO_SPACES_ENDPOINT;
export const DO_SPACES_BUCKET = process.env.DO_SPACES_BUCKET;

export const AUX_URL = process.env.AUX_URL;