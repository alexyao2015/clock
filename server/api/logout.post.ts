import {
  getSessionID,
  purgeSession,
  setSessionCookie,
  createSession,
} from "..";

interface Response {
  success: any;
}

export default defineEventHandler(async (event): Promise<Response> => {
  await purgeSession(getSessionID(event));
  setSessionCookie(event, await createSession());
  return { success: true };
});
