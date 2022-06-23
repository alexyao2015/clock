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
  const body: ActionQuery = await useBody(event);

  const result = await User.findOne({
    where: { employeeID: body.employee_id },
  });
  if (result === null || !(body.action in PunchActions)) {
    return { success: false };
  }

  if ([PunchActions.punchIn, PunchActions.punchOut].includes(body.action)) {
    // punch
    if (
      (body.action === PunchActions.punchIn && result.workShiftActive) ||
      (body.action === PunchActions.punchOut && !result.workShiftActive) ||
      result.breakActive ||
      result.lunchActive
    ) {
      return { success: false };
    }
    await User.update(
      { workShiftActive: body.action === PunchActions.punchIn },
      { where: { employeeID: body.employee_id } }
    );
  } else if (
    [PunchActions.lunchIn, PunchActions.lunchOut].includes(body.action)
  ) {
    // lunch
    if (!result.workShiftActive || result.breakActive) {
      return { success: false };
    }
    await User.update(
      { lunchActive: body.action === PunchActions.lunchIn },
      { where: { employeeID: body.employee_id } }
    );
  } else {
    // break
    if (!result.workShiftActive || result.lunchActive) {
      return { success: false };
    }
    await User.update(
      { breakActive: body.action === PunchActions.breakIn },
      { where: { employeeID: body.employee_id } }
    );
  }
  // log action
  await PunchLog.create({
    employeeID: body.employee_id,
    action: body.action,
  });
  return { success: true };
});
