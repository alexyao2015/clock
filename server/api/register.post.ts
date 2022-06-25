import { prisma } from "../index";

interface Body {
  employee_id?: string;
  firstName?: string;
  lastName?: string;
}

interface Response {
  success: boolean;
}

export default defineEventHandler(async (event): Promise<Response> => {
  const body: Body = await useBody(event);

  if (!(body.employee_id && body.firstName && body.lastName)) {
    return { success: false };
  }

  await prisma.users.create({
    data: {
      employeeID: body.employee_id,
      isAdmin: false,
      firstName: body.firstName,
      lastName: body.lastName,
    },
  });
  return { success: true };
});
