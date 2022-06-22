import { User } from "../../backend/models";

interface ActionQuery {
  employee_id?: string;
}

interface Response {
  authorized: boolean;
  firstName?: string;
  lastName?: string;
  workShiftActive?: boolean;
  breakActive?: boolean;
  lunchActive?: boolean;
}

export default defineEventHandler(async (event): Promise<Response> => {
  const query: ActionQuery = useQuery(event);

  const result = await User.findOne({
    where: { employeeID: query.employee_id },
  });
  if (result !== null) {
    return {
      authorized: true,
      firstName: result.firstName,
      lastName: result.lastName,
      workShiftActive: result.workShiftActive,
      breakActive: result.breakActive,
      lunchActive: result.lunchActive,
    };
  }
  return { authorized: false };
});
