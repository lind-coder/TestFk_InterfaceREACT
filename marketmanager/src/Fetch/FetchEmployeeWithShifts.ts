import axios from "axios";
import { EmployeeWithShifts } from "../Types/EmployeeWithShifts";

export const getEmployeesWithShifts = async (): Promise<
  EmployeeWithShifts[]
> => {
  const res = await axios.get<any[]>(
    "http://localhost:7226/api/getAllEmployeeWithShifts"
  );

  return res.data.map((e) => ({
    employee_ID: e.Employee_ID,
    name: e.Name,
    surname: e.Surname,
    supermarket: e.Supermarket
      ? {
          supermarket_ID: e.Supermarket.Supermarket_ID, // Aggiungi questo campo
          name: e.Supermarket.Name,
        }
      : null,
    shifts: e.Shift
      ? e.Shift.map((s: any) => ({
          shift_ID: s.Shift_ID,
          startDate: s.StartDate,
          endDate: s.EndDate,
        }))
      : [],
  }));
};
