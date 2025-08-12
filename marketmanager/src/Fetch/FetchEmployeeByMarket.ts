import axios from "axios";
import { Employee } from "../Types/Employee";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(
    "`https://localhost:7226/api/Employee/getEmployeesByMarket/${id}"
  );
  return response.data;
};
