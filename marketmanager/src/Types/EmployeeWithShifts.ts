export interface Shift {
  employee: any;
  username: any;
  shift_ID: number;
  startDate: string;
  endDate: string;
}

export interface Supermarket {
  supermarket_ID: number;
  name: string;
}

export interface EmployeeWithShifts {
  employee_ID: number;
  name: string;
  surname: string;
  supermarket: Supermarket | null;
  shifts: Shift[];
}
