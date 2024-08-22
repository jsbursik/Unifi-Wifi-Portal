import express, { type Express, type Request, type Response, type NextFunction } from "express";

import { ExpressAuth, getSession } from "@auth/express";
import { authConfig } from "./config/auth.config.js";

const app: Express = express();

const port = process.env.PORT || 3000;

app.set("trust proxy", true);

app.use('/api/auth/*', ExpressAuth(authConfig));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(`[server]: Connection from ${req.ip}`);
  res.send("Hello World!");
})

app.get('/protected', async (req: Request, res: Response, next: NextFunction) => {
  const session = await (getSession(req, authConfig)) ?? undefined;
  console.log(`[server]: Displaying Session to user at ${req.ip}`)
  res.send(JSON.stringify(session))
})

app.listen(port, "0.0.0.0", () => {
  console.log(`[server]: Server listening on http://0.0.0.0:${port}`);
})