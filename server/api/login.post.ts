import { prisma, getSession, setSession } from "..";

interface LoginQuery {
  employee_id?: string;
}

interface Response {
  authorized: boolean;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
}

const failedResponse: Response = { authorized: false };

export default defineEventHandler(async (event): Promise<Response> => {
  const body: LoginQuery = await useBody(event);

  const session = await getSession(event);
  const employee_id = body?.employee_id || session.employee_id;

  if (!employee_id) {
    return failedResponse;
  }

  const result = await prisma.users.findUnique({
    where: { employeeID: employee_id },
  });
  if (result !== null) {
    session.employee_id = employee_id;
    setSession(event, session);
    return {
      authorized: true,
      isAdmin: result.isAdmin,
      firstName: result.firstName,
      lastName: result.lastName,
    };
  }
  return failedResponse;
});
