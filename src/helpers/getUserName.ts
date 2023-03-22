import {EmployeesData} from "../interfaces/sessionTypes"

export const getEmployeeName = (employeeId: string, employees: EmployeesData[]) => {
    const employee = employees?.find((e) => e.employeeId === employeeId);
    return employee ? employee.fullName : "Unknown";
};