import { prisma, getSession } from "../..";

interface ActionQuery {
  employee_id?: string;
}

interface Response {
  authorized: boolean;
  workShiftActive?: boolean;
  breakActive?: boolean;
  lunchActive?: boolean;
}

const failedResponse: Response = {
  authorized: false,
};

export default defineEventHandler(async (event): Promise<Response> => {
  const query: ActionQuery = useQuery(event);

  let employee_id = query.employee_id || (await getSession(event)).employee_id;

  if (!employee_id) {
    return failedResponse;
  }

  const result = await prisma.users.findUnique({
    where: { employeeID: employee_id },
  });
  if (result !== null) {
    return {
      authorized: true,
      workShiftActive: result.workShiftActive,
      breakActive: result.breakActive,
      lunchActive: result.lunchActive,
    };
  }
  return failedResponse;
});
