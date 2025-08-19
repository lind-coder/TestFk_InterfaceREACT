import axios from "axios";

export const fetchShiftsByEmployeeAndRange = async (
  employeeId: number,
  startDate: string,
  endDate: string
) => {
  const response = await axios.get(
    "https://localhost:7226/GetShiftsByEmployeeAndRange",
    {
      params: {
        employeeId,
        startDate,
        endDate,
      },
    }
  );
  return response.data;
};
