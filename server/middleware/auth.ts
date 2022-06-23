import session from "express-session";
import sessionRedis from "connect-redis";
import { redis } from "../index";

let RedisStore = sessionRedis(session);

const s = session({
  store: new RedisStore({ client: redis }),
  cookie: {
    maxAge: 5 * 60 * 1000, // 5 minutes
    sameSite: "strict",
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  secret: "importantSecretDemo",
});

export default defineEventHandler(async (event) => {
  // need to wait until the session data is appended to the request
  await new Promise((resolve) => {
    s(event.req, event.res, resolve);
  });
});
