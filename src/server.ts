import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import route from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

route(app);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});