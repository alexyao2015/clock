import { models } from "../index";

export default defineEventHandler(async (event) => {
  return { api: await models.User.findAll() };
});
