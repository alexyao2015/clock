import { User, PunchLog } from "../../backend/models";
import { PunchActions } from "../../../enum/punchActions";

interface ActionQuery {
  employee_id?: string;
  action?: PunchActions;
}

interface Response {
  success: boolean;
}

export default defineEventHandler(async (event): Promise<Response> => {
  const query: ActionQuery = useQuery(event);

  const result = await User.findOne({
    where: { employeeID: query.employee_id },
  });
  if (result === null || !(query.action in PunchActions)) {
    return { success: false };
  }

  if (query.action in [PunchActions.punchIn, PunchActions.punchOut]) {
    // punch
    if (
      (query.action === PunchActions.punchIn && result.workShiftActive) ||
      (query.action === PunchActions.punchOut && !result.workShiftActive) ||
      result.breakActive ||
      result.lunchActive
    ) {
      return { success: false };
    }
    await User.update(
      { workShiftActive: query.action === PunchActions.punchIn },
      { where: { employeeID: query.employee_id } }
    );
  } else if (query.action in [PunchActions.lunchIn, PunchActions.lunchOut]) {
    // lunch
    if (!result.workShiftActive) {
      return { success: false };
    }
    await User.update(
      { lunchActive: query.action === PunchActions.lunchIn },
      { where: { employeeID: query.employee_id } }
    );
  } else {
    // break
    if (!result.workShiftActive) {
      return { success: false };
    }
    await User.update(
      { breakActive: query.action === PunchActions.breakIn },
      { where: { employeeID: query.employee_id } }
    );
  }
  // log action
  await PunchLog.create({
    employeeID: query.employee_id,
    action: query.action,
  });
  return { success: true };
});
