import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { EmployeeWithShifts } from "../Types/EmployeeWithShifts";
import { getEmployeesWithShifts } from "../Fetch/FetchEmployeeWithShifts";

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
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeWithShifts | null>(null);

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
        onRowClick={(params) => setSelectedEmployee(params.row)}
      />

      {selectedEmployee && (
        <Box mt={2}>
          <h3>Dettagli Dipendente</h3>
          <p>
            <strong>ID:</strong> {selectedEmployee.employee_ID}
          </p>
          <p>
            <strong>Nome:</strong> {selectedEmployee.name}
          </p>
          <p>
            <strong>Cognome:</strong> {selectedEmployee.surname}
          </p>
          <p>
            <strong>Supermercato:</strong>{" "}
            {selectedEmployee.supermarket?.name || "N/A"}
          </p>

          <h4>Turni</h4>
          <ul>
            {selectedEmployee.shifts.map((shift) => (
              <li key={shift.shift_ID}>
                {new Date(shift.startDate).toLocaleString()} -{" "}
                {new Date(shift.endDate).toLocaleString()}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};
