import { cookieName, maxAge } from "./const";
import { useCookie, CompatibilityEvent } from "h3";
import { prisma } from "./prisma";
import cryptoRandomString from "crypto-random-string";
import { sessionData } from "./types";

export const getSession = async (
  event: CompatibilityEvent
): Promise<sessionData> => {
  let session_id = useCookie(event, cookieName);
  if (!session_id) {
    return {};
  }

  const session = await prisma.session.findUnique({
    where: {
      session_id: session_id,
    },
  });

  if (!session) {
    return {};
  }
  return JSON.parse(session.data);
};

export const setSession = async (
  event: CompatibilityEvent,
  data: sessionData
) => {
  let session_id = useCookie(event, cookieName);
  await prisma.session.update({
    where: {
      session_id: session_id,
    },
    data: {
      data: JSON.stringify(data),
      expiresAt: new Date(Date.now().valueOf() + maxAge),
    },
  });
};

export const createSession = async (): Promise<string> => {
  const session_id = cryptoRandomString({
    length: 128,
    type: "alphanumeric",
  });
  await prisma.session.create({
    data: {
      session_id: session_id,
      expiresAt: new Date(Date.now().valueOf() + maxAge),
    },
  });
  return session_id;
};

export const getSessionID = (event: CompatibilityEvent): string => {
  return useCookie(event, cookieName);
};

export const setSessionCookie = (
  event: CompatibilityEvent,
  session_id: string
): void => {
  setCookie(event, cookieName, session_id);
};

export const purgeSession = async (session_id: string | null | undefined) => {
  if (!session_id) {
    return;
  }

  await prisma.session.deleteMany({
    where: {
      session_id: session_id,
    },
  });
};
