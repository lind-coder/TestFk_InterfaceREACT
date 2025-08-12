import axios from "axios";
import { Shift } from "../Types/Shifts";

interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const fetchAllShifts = async (
  page: number = 1,
  pageSize: number = 5
): Promise<PaginatedResult<Shift>> => {
  try {
    const response = await axios.get("https://localhost:7226/getAllShift", {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Errore nel fetch dei turni:", error);
    throw error;
  }
};
