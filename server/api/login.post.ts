import { prisma, util } from "../index";

interface LoginQuery {
  employee_id?: string;
}

interface Response {
  authorized: any;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
}

const failedResponse: Response = { authorized: false };

export default defineEventHandler(async (event): Promise<Response> => {
  const body: LoginQuery = await useBody(event);

  let employee_id = util.getSessionEmployeeID(event, body.employee_id);

  if (!employee_id) {
    return failedResponse;
  }

  const result = await prisma.users.findUnique({
    where: { employeeID: employee_id },
  });
  if (result !== null) {
    util.setSessionEmployeeID(event, employee_id);
    return {
      authorized: true,
      isAdmin: result.isAdmin,
      firstName: result.firstName,
      lastName: result.lastName,
    };
  }
  return failedResponse;
});
