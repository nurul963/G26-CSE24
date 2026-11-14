import dotenv from 'dotenv';
dotenv.config();
export const PORT=process.env.PORT;
export const MONGO_URI=process.env.MONGO_URI;
export const DB_USERNAME=process.env.DB_USERNAME;
export const DB_PASSWORD=process.env.DB_PASSWORD;