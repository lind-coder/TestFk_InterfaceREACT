import axios from "axios";
import { Employee } from "../Types/Employee";

export async function getAllEmployees(): Promise<Employee[]> {
  try {
    const res = await axios.get<Employee[]>(
      "https://localhost:7226/api/Employee/getAllEmployeeList"
    );
    return res.data;
  } catch (error) {
    console.error("Errore nel fetch degli employee:", error);
    return [];
  }
}
