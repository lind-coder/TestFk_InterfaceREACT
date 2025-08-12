import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { fetchShiftsByRange } from "../Fetch/FetchShiftsByRange";
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
};

const columns: GridColDef[] = [
  { field: "shift_ID", headerName: "ID Turno", width: 100 },
  {
    field: "startDateFormatted",
    headerName: "Inizio",
    width: 200,
  },
  {
    field: "endDateFormatted",
    headerName: "Fine",
    width: 200,
  },
  { field: "username", headerName: "Username Dipendente", width: 200 },
];

const ShiftsDataGrid = () => {
  const [shifts, setShifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      alert("Seleziona entrambe le date");
      return;
    }

    setLoading(true);
    try {
      const start = startDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss");
      const end = endDate.endOf("day").format("YYYY-MM-DDTHH:mm:ss");

      const data = await fetchShiftsByRange(start, end);

      if (!Array.isArray(data)) {
        throw new Error("Dati non validi ricevuti dal filtro");
      }

      const formattedData = data.map((shift) => ({
        ...shift,
        startDateFormatted: moment(shift.startDate).format("DD/MM/YYYY HH:mm"),
        endDateFormatted: moment(shift.endDate).format("DD/MM/YYYY HH:mm"),
      }));

      setShifts(formattedData);
    } catch (error) {
      console.error("Errore nel fetch per range:", error);
      setShifts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setShifts([]);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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
      <Box
        sx={{
          textAlign: "center",
          mt: 2,
          color: "#C62828",
          fontWeight: "bold",
        }}
      >
        Visualizzati {shifts.length} turni
      </Box>
    </Box>
  );
};

export default ShiftsDataGrid;
