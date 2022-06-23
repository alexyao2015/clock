import { User } from "../backend/models";

interface LoginQuery {
  employee_id?: string;
}

interface Response {
  authorized: any;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
}

export default defineEventHandler(async (event): Promise<Response> => {
  const body: LoginQuery = await useBody(event);

  const result = await User.findOne({
    where: { employeeID: body.employee_id },
  });
  if (result !== null) {
    return {
      authorized: true,
      isAdmin: result.isAdmin,
      firstName: result.firstName,
      lastName: result.lastName,
    };
  }
  return { authorized: false };
});
