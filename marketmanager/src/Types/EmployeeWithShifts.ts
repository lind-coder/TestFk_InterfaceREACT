export interface Shift {
  shift_ID: number;
  startDate: string;
  endDate: string;
}

export interface Supermarket {
  name: string;
}

export interface EmployeeWithShifts {
  employee_ID: number;
  name: string;
  surname: string;
  supermarket: Supermarket | null;
  shifts: Shift[];
}
