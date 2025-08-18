import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Stack, TextField } from "@mui/material";
import moment from "moment";
import { fetchShiftsByRange } from "../Fetch/FetchShiftsByRange";
import { fetchShiftsByEmployeeAndRange } from "../Fetch/FetchShiftsByEmployeeAndRange";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const redTheme = {
  button: {
    backgroundColor: "#C62828",
    color: "white",
    "&:hover": {
      backgroundColor: "#8E0000",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(198, 40, 40, 0.5)",
      color: "white",
    },
  },
  datePicker: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#C62828",
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: "#C62828",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C62828",
      },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    "& .MuiInputLabel-root": {
      color: "#C62828",
      fontWeight: "bold",
    },
    "& .MuiInputBase-input": {
      color: "#C62828",
      fontWeight: "bold",
    },
    "& .MuiOutlinedInput-input": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    width: "100%",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#C62828",
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: "#C62828",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#C62828",
      },
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    "& .MuiInputLabel-root": {
      color: "#C62828",
      fontWeight: "bold",
    },
    "& .MuiInputBase-input": {
      color: "#C62828",
      fontWeight: "bold",
    },
  },
};

const columns: GridColDef[] = [
  { field: "shift_ID", headerName: "ID Turno", width: 200 },
  {
    field: "startDateFormatted",
    headerName: "Inizio",
    width: 400,
  },
  {
    field: "endDateFormatted",
    headerName: "Fine",
    width: 400,
  },
  { field: "username", headerName: "Username Dipendente", width: 400 },
  { field: "employee_ID", headerName: "ID Dipendente", width: 200 },
];

const ShiftsDataGrid = () => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [employeeId, setEmployeeId] = useState<string>("");

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      alert("Seleziona entrambe le date");
      return;
    }

    setLoading(true);
    try {
      const start = startDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss");
      const end = endDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss");

      let data;

      if (employeeId.trim()) {
        const employeeIdNum = parseInt(employeeId);
        if (isNaN(employeeIdNum)) {
          throw new Error("ID dipendente deve essere un numero valido");
        }
        data = await fetchShiftsByEmployeeAndRange(employeeIdNum, start, end);
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
      alert(
        error instanceof Error
          ? error.message
          : "Errore durante il recupero dei dati"
      );
      setShifts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setEmployeeId("");
    setShifts([]);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            label="ID Dipendente (opzionale)"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            sx={{ ...redTheme.textField, width: 220 }}
            variant="outlined"
            size="medium"
          />
          <DatePicker
            label="Data Inizio"
            value={startDate}
            onChange={setStartDate}
            sx={{ width: 220 }}
            slotProps={{
              textField: {
                variant: "outlined",
                sx: redTheme.datePicker,
                size: "medium",
              },
            }}
          />
          <DatePicker
            label="Data Fine"
            value={endDate}
            onChange={setEndDate}
            sx={{ width: 220 }}
            slotProps={{
              textField: {
                variant: "outlined",
                sx: redTheme.datePicker,
                size: "medium",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleFilter}
            sx={redTheme.button}
            size="large"
            disabled={!startDate || !endDate}
          >
            Filtra
          </Button>
          <Button
            variant="contained"
            onClick={handleReset}
            sx={redTheme.button}
            size="large"
          >
            Reset
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
