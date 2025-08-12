import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Employee } from "../Types/Employee";
import { getAllEmployees } from "../Fetch/FetchAllEmployees";

export default function AllEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getAllEmployees().then(setEmployees);
  }, []);

  const columns: GridColDef[] = [
    { field: "employee_ID", headerName: "ID", width: 80 },
    { field: "name", headerName: "Nome", width: 350 },
    { field: "surname", headerName: "Cognome", width: 350 },
    { field: "supermarket_ID", headerName: "Supermarket ID", width: 350 },
    { field: "username", headerName: "Username", width: 350 },
  ];

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <DataGrid
        rows={employees}
        columns={columns}
        getRowId={(row) => row.employee_ID}
        pageSizeOptions={[5, 10, 25]}
      />
    </Box>
  );
}
