import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmployeeWithShifts } from "../Types/EmployeeWithShifts";
import { getEmployeesWithShifts } from "../Fetch/FetchEmployeeWithShifts";
import { useNavigate } from "react-router-dom"; // <-- import

const columns: GridColDef[] = [
  { field: "employee_ID", headerName: "ID", width: 90 },
  { field: "name", headerName: "Nome", width: 150 },
  { field: "surname", headerName: "Cognome", width: 150 },
  {
    field: "supermarketName",
    headerName: "Supermercato",
    width: 200,
    valueGetter: (params: { row: EmployeeWithShifts }) =>
      params.row.supermarket?.name || "",
  },
];

export const EmployeeDataGrid = () => {
  const [employees, setEmployees] = useState<EmployeeWithShifts[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeesWithShifts()
      .then(setEmployees)
      .catch((err) => {
        console.error("Errore nel fetch degli employee con shifts:", err);
        setEmployees([]);
      });
  }, []);

  return (
    <Box sx={{ width: 800, height: 600 }}>
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row.employee_ID}
        pageSizeOptions={[5, 10, 25]}
        onRowClick={
          (params) => navigate(`/employee/${params.row.employee_ID}`) // <-- naviga alla pagina dei turni
        }
      />
    </Box>
  );
};
