import { prisma } from "../../index";
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

  const result = await prisma.users.findUnique({
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
    await prisma.users.update({
      where: { employeeID: body.employee_id },
      data: { workShiftActive: body.action === PunchActions.punchIn },
    });
  } else if (
    [PunchActions.lunchIn, PunchActions.lunchOut].includes(body.action)
  ) {
    // lunch
    if (!result.workShiftActive || result.breakActive) {
      return { success: false };
    }
    await prisma.users.update({
      where: { employeeID: body.employee_id },
      data: { lunchActive: body.action === PunchActions.lunchIn },
    });
  } else {
    // break
    if (!result.workShiftActive || result.lunchActive) {
      return { success: false };
    }
    await prisma.users.update({
      where: { employeeID: body.employee_id },
      data: { breakActive: body.action === PunchActions.breakIn },
    });
  }
  // log action
  await prisma.logs.create({
    data: {
      employeeID: body.employee_id,
      action: body.action,
    },
  });
  return { success: true };
});
