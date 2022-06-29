import {
  prisma,
  createSession,
  purgeSession,
  getSessionID,
  setSessionCookie,
} from "..";

// create session if not existing or expired

export default defineEventHandler(async (event) => {
  let session_id = getSessionID(event);
  let expiresAt = new Date(0);
  if (session_id) {
    const session_data = await prisma.session.findUnique({
      where: {
        session_id: session_id,
      },
    });
    if (session_data) {
      expiresAt = session_data.expiresAt;
    }
  }
  if (expiresAt < new Date()) {
    await purgeSession(session_id);
    session_id = await createSession();
    setSessionCookie(event, session_id);
  }
});
