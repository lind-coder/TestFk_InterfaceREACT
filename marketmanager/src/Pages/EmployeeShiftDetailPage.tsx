import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { Shift } from "../Types/Shifts";
import { Button, Typography } from "@mui/material";

const shiftsColumns: GridColDef[] = [
  { field: "shift_ID", headerName: "ID Turno", width: 300 },
  { field: "startDate", headerName: "Data Inizio", width: 300 },
  { field: "endDate", headerName: "Data Fine", width: 300 },
];

export default function EmployeeShiftDetailPage() {
  const { employeeId } = useParams<{ employeeId?: string }>();
  const navigate = useNavigate();

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loadingShifts, setLoadingShifts] = useState(true);

  useEffect(() => {
    if (!employeeId) return;

    axios
      .get<Shift[]>(
        `https://localhost:7226/api/Employee/GetShiftsByEmployee/${employeeId}`
      )
      .then((res) => {
        setShifts(res.data);
        setLoadingShifts(false);
      })
      .catch(() => {
        setShifts([]);
        setLoadingShifts(false);
      });
  }, [employeeId]);

  if (loadingShifts) return <div>Caricamento turni...</div>;

  return (
    <>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        sx={{
          backgroundColor: "#C62828",
          color: "white",
          borderRadius: "12px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#9b2020",
          },
        }}
      >
        ← Indietro
      </Button>
      <Typography color="white">
        Turni del dipendente ID: {employeeId}
      </Typography>
      <Typography color="white">Turni Assegnati ({shifts.length})</Typography>
      <div style={{ height: 450, width: 900 }}>
        <DataGrid
          rows={shifts}
          columns={shiftsColumns}
          getRowId={(row) => row.shift_ID}
          pageSizeOptions={[5, 10]}
          pagination
          disableRowSelectionOnClick
        />
      </div>
    </>
  );
}
