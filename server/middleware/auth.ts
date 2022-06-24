import session from "express-session";
import { prisma } from "../index";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const s = session({
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
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
