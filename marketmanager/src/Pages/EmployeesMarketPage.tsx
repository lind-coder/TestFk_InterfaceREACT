import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { EmployeeWithShifts } from "../Types/EmployeeWithShifts";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const columns: GridColDef[] = [
  { field: "employee_ID", headerName: "ID", width: 300 },
  { field: "name", headerName: "Nome", width: 300 },
  { field: "surname", headerName: "Cognome", width: 300 },
];

export default function MarketEmployeesPage() {
  const { id } = useParams<{ id?: string }>();
  const [employees, setEmployees] = useState<EmployeeWithShifts[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    axios
      .get<EmployeeWithShifts[]>(
        `https://localhost:7226/api/Employee/getEmployeesByMarket/${id}`
      )
      .then((res) => setEmployees(res.data))
      .catch(() => setEmployees([]));
  }, [id]);

  return (
    <>
      <Button
        onClick={() => navigate("/markets")}
        variant="contained"
        sx={{
          marginBottom: "20px",
          padding: "10px 15px",
          backgroundColor: "#C62828",
          color: "white",
          borderRadius: "12px",
          textTransform: "none", // per evitare maiuscole automatiche di MUI
          "&:hover": {
            backgroundColor: "#9b2020",
          },
        }}
      >
        ← Torna ai Supermercati
      </Button>
      <Typography color="white">Dipendenti Supermercato {id}</Typography>
      <div style={{ height: 450, width: 900 }}>
        <DataGrid
          rows={employees}
          columns={columns}
          getRowId={(row) => row.employee_ID}
          pageSizeOptions={[5, 10]}
          pagination
          onRowClick={(params: GridRowParams<EmployeeWithShifts>) =>
            navigate(`/employee/${params.row.employee_ID}`)
          }
        />
      </div>
    </>
  );
}
