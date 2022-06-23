import { prisma } from "../../index";

interface ActionQuery {
  employee_id?: string;
}

interface Response {
  authorized: boolean;
  workShiftActive?: boolean;
  breakActive?: boolean;
  lunchActive?: boolean;
}

export default defineEventHandler(async (event): Promise<Response> => {
  const query: ActionQuery = useQuery(event);

  const result = await prisma.users.findUnique({
    where: { employeeID: query.employee_id },
  });
  if (result !== null) {
    return {
      authorized: true,
      workShiftActive: result.workShiftActive,
      breakActive: result.breakActive,
      lunchActive: result.lunchActive,
    };
  }
  return { authorized: false };
});
