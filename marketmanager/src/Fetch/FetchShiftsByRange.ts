import axios from "axios";
import { Shift } from "../Types/EmployeeWithShifts";

export const fetchShiftsByRange = async (
  startDate: string,
  endDate: string
): Promise<Shift[]> => {
  try {
    console.log(" Invio richiesta con:", { startDate, endDate });
    const response = await axios.get(
      "https://localhost:7226/GetAllShiftsByRange",
      {
        params: {
          startDate,
          endDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(" Errore dettagliato:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
    } else {
      console.error(" Errore sconosciuto:", error);
    }
    throw error;
  }
};
