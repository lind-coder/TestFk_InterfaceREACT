import axios from "axios";

export const fetchShiftsByEmployeeAndRange = async (
  employeeId: number,
  startDate: string,
  endDate: string,
  supermarketId?: number // ← nuovo parametro opzionale
) => {
  const params: any = {
    employeeId,
    startDate,
    endDate,
  };

  if (supermarketId) {
    params.supermarketId = supermarketId; // aggiunge il filtro solo se presente
  }

  const response = await axios.get(
    "https://localhost:7226/GetShiftsByEmployeeAndRange",
    { params }
  );

  return response.data;
};
