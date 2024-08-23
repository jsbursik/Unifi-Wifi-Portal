import express, { type Express, type Request, type Response, type NextFunction } from "express";

import { ExpressAuth } from "@auth/express";
import { authConfig } from "./config/auth.config.js";
import { authSession, authenticatedUser } from "./middleware/auth.js";

const app: Express = express();

const port = process.env.PORT || 3000;

app.set("trust proxy", true);

app.use(authSession);

app.use("/api/auth/*", ExpressAuth(authConfig));

app.get("/", (req: Request, res: Response) => {
  const { session } = res.locals;
  console.log(`[server]: Connection from ${res.locals.session ? res.locals.session.user.name : req.ip}`);
  res.send(`Hello ${res.locals.session ? res.locals.session.user.name : "World"}!`);
});

app.get("/protected", authenticatedUser, async (req: Request, res: Response) => {
  console.log(`[server]: ${res.locals.session.user.name} accessed /protected`);
  res.send(`Hello, ${res.locals.session.user.name}, this page is protected!`);
});

app.listen(port, () => {
  console.log(`[server]: Server listening on http://localhost:${port}`);
});
