import { models } from "../index";

interface LoginQuery {
  employee_id?: string;
}

interface Response {
  authorized: any;
  isAdmin?: boolean;
}

export default defineEventHandler(async (event) => {
  const query: LoginQuery = await useQuery(event);

  const result = await models.User.findOne({
    where: { employeeID: query.employee_id },
  });
  if (result !== null) {
    return { authorized: true, isAdmin: result.isAdmin } as Response;
  }
  return { authorized: false } as Response;
});
