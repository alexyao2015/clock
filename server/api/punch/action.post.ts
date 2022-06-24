import { prisma, util } from "../../index";
import { PunchActions } from "../../../enum/punchActions";

interface ActionQuery {
  employee_id?: string;
  action?: PunchActions;
}

interface Response {
  success: boolean;
}

const failedResponse: Response = {
  success: false,
};

export default defineEventHandler(async (event): Promise<Response> => {
  const body: ActionQuery = await useBody(event);

  let employee_id = util.getSessionEmployeeID(event, body.employee_id);

  if (!employee_id) {
    return failedResponse;
  }

  const result = await prisma.users.findUnique({
    where: { employeeID: employee_id },
  });
  if (result === null || !(body.action in PunchActions)) {
    return failedResponse;
  }

  if ([PunchActions.punchIn, PunchActions.punchOut].includes(body.action)) {
    // punch
    if (
      (body.action === PunchActions.punchIn && result.workShiftActive) ||
      (body.action === PunchActions.punchOut && !result.workShiftActive) ||
      result.breakActive ||
      result.lunchActive
    ) {
      return failedResponse;
    }
    await prisma.users.update({
      where: { employeeID: employee_id },
      data: {
        workShiftActive: body.action === PunchActions.punchIn,
        logs: { create: { action: body.action } },
      },
    });
  } else if (
    [PunchActions.lunchIn, PunchActions.lunchOut].includes(body.action)
  ) {
    // lunch
    if (!result.workShiftActive || result.breakActive) {
      return failedResponse;
    }
    await prisma.users.update({
      where: { employeeID: employee_id },
      data: {
        lunchActive: body.action === PunchActions.lunchIn,
        logs: { create: { action: body.action } },
      },
    });
  } else {
    // break
    if (!result.workShiftActive || result.lunchActive) {
      return failedResponse;
    }
    await prisma.users.update({
      where: { employeeID: employee_id },
      data: {
        breakActive: body.action === PunchActions.breakIn,
        logs: { create: { action: body.action } },
      },
    });
  }
  return { success: true };
});
