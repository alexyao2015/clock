import { util } from "../index";

interface Response {
  success: any;
}

export default defineEventHandler(async (event): Promise<Response> => {
  // session is dynamically appended to request
  // @ts-ignore
  let sess = event.req.session;
  util.setSessionEmployeeID(event, null);
  sess.save(() => {
    sess.regenerate(() => {});
  });
  return { success: true };
});
