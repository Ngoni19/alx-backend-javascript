export default function createReportObject(employeesList) {
  const allEmployees = {};
  for (const [departmentName, employees] of Object.entries(employeesList)) {
     allEmployees[departmentName] = [...employees];
  }

  const obj = {
    allEmployees,
    getNumberOfDepartments() {
      return Object.keys(employeesList).length;
    },
  };
  return obj;
}
