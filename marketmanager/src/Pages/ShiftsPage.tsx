import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Stack, TextField } from "@mui/material";
import moment from "moment";
import { fetchShiftsByRange } from "../Fetch/FetchShiftsByRange";
import { fetchShiftsByEmployeeAndRange } from "../Fetch/FetchShiftsByEmployeeAndRange";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useParams, useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "shift_ID", headerName: "ID Turno", width: 200 },
  { field: "startDateFormatted", headerName: "Inizio", width: 400 },
  { field: "endDateFormatted", headerName: "Fine", width: 400 },
  { field: "username", headerName: "Username Dipendente", width: 400 },
  { field: "employee_ID", headerName: "ID Dipendente", width: 200 },
];

const ShiftsDataGrid = () => {
  const { employeeId } = useParams<{ employeeId?: string }>();
  const navigate = useNavigate();

  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [employeeIdState, setEmployeeIdState] = useState<string>("");

  const handleFilter = async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    try {
      const start = startDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss");
      const end = endDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss");

      let data;
      if (employeeIdState.trim()) {
        data = await fetchShiftsByEmployeeAndRange(
          parseInt(employeeIdState),
          start,
          end
        );
      } else {
        data = await fetchShiftsByRange(start, end);
      }

      const formattedData = data.map((shift: any) => ({
        ...shift,
        startDateFormatted: moment(shift.startDate).format("DD/MM/YYYY HH:mm"),
        endDateFormatted: moment(shift.endDate).format("DD/MM/YYYY HH:mm"),
      }));

      setShifts(formattedData);
    } catch (error) {
      console.error("Errore durante il fetch:", error);
      setShifts([]);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Auto-popola campi e filtra all'avvio
  useEffect(() => {
    const end = moment();
    const start = moment().subtract(30, "days");

    setStartDate(start);
    setEndDate(end);

    if (employeeId) {
      setEmployeeIdState(employeeId);
    }

    // Lancia il filtro solo quando employeeId è presente
    if (employeeId) {
      (async () => {
        await new Promise((r) => setTimeout(r, 0)); // evita race condition con setState
        handleFilter();
      })();
    }
  }, [employeeId]);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, backgroundColor: "#C62828", color: "white" }}
      >
        ← Indietro
      </Button>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            label="ID Dipendente"
            value={employeeIdState}
            onChange={(e) => setEmployeeIdState(e.target.value)}
            sx={{
              width: 220,
              border: "#C62828",
              backgroundColor: "white",
              color: "black",
            }}
            variant="outlined"
            size="medium"
          />
          <DatePicker
            label="Data Inizio"
            value={startDate}
            onChange={setStartDate}
            sx={{
              width: 220,
              border: "#C62828",
              backgroundColor: "white",
              color: "black",
            }}
          />
          <DatePicker
            label="Data Fine"
            value={endDate}
            onChange={setEndDate}
            sx={{
              width: 220,
              border: "#C62828",
              backgroundColor: "white",
              color: "black",
            }}
          />
          <Button
            variant="contained"
            onClick={handleFilter}
            sx={{ backgroundColor: "#C62828", color: "white" }}
            size="large"
          >
            Filtra
          </Button>
        </Stack>
      </LocalizationProvider>
      <Box sx={{ height: 500, mb: 2 }}>
        <DataGrid
          rows={shifts}
          columns={columns}
          getRowId={(row) => row.shift_ID}
          loading={loading}
          hideFooterPagination
        />
      </Box>
    </Box>
  );
};

export default ShiftsDataGrid;
