const getSessionEmployeeID = (event, employee_id: string) => {
  // session is dynamically appended to request
  // @ts-ignore
  let sess = event.req.session;
  if (!employee_id && sess.employee_id) {
    employee_id = sess.employee_id;
  }
  return employee_id;
};

const setSessionEmployeeID = (event, employee_id: string) => {
  // session is dynamically appended to request
  // @ts-ignore
  let sess = event.req.session;
  if (employee_id || sess.employee_id) {
    sess.employee_id = employee_id;
  }
};

export default { getSessionEmployeeID, setSessionEmployeeID };
